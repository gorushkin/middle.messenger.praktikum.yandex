import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";

import { EventBus } from "./eventBus";

type Props = {
  [key: string]: unknown;
};

type Children = {
  [key: string]: Block | Block[];
};

type PropsAndChildren = {
  [key: string]: Block | unknown;
};

type Meta = {
  props: Props;
};

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element: HTMLElement | null = null;
  _meta: Meta | null = null;
  props: Props;
  eventBus: EventBus;

  template: string;

  compiler = Handlebars.compile;

  _id: string | null;

  debug: boolean = false;
  children: Children = {};

  constructor(
    propsAndChildren: PropsAndChildren = { props: {}, children: {} },
    withInternalID = false,
    template: string = "",
    debug = false
  ) {
    const eventBus = new EventBus();
    this.debug = debug;
    this.template = template;

    const { children, props } = this._getChildren(propsAndChildren);
    this.log("propsAndChildren: ", propsAndChildren);
    this.log("children: ", children);

    this._meta = {
      props: propsAndChildren,
    };

    this.props = this._makePropsProxy(props);
    this._id = withInternalID ? makeUUID() : null;

    this.eventBus = eventBus;

    this.children = children;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: PropsAndChildren): {
    children: Children;
    props: Props;
  } {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((v) => v instanceof Block))
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  // TODO: remove before finish
  log(...args: unknown[]) {
    if (this.debug) {
      console.info(...args);
    }
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {
    throw new Error("Method not implemented.");
  }

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    const areEqual = JSON.stringify(oldProps) === JSON.stringify(newProps);
    return !areEqual;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const element = this.render().firstElementChild as HTMLElement;

    this._element = element;
  }

  render(): DocumentFragment {
    return this.compile();
  }

  getContent(): HTMLElement {
    if (!this.element) {
      throw new Error("Element is not defined");
    }

    return this.element;
  }

  _makePropsProxy(props: Props): Props {
    const proxy = new Proxy(props, {
      set: (target, prop, value) => {
        const prev = { ...target };
        target[prop as string] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, prev, target);
        return true;
      },
      deleteProperty() {
        throw new Error();
      },
    });

    return proxy;
  }

  _createDocumentElement(): HTMLTemplateElement {
    const element = document.createElement("template");

    if (this._id) {
      element.setAttribute("data-id", this._id);
    }

    return element as HTMLTemplateElement;
  }

  compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (item: Block) => `<div data-id="${item._id}"></div>`
        );
        return;
      }

      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement() as HTMLTemplateElement;

    this.log("propsAndStubs: ", propsAndStubs);
    fragment.innerHTML = Handlebars.compile(this.template)(propsAndStubs);
    this.log("fragment.innerHTML: ", fragment.innerHTML);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="${ch._id}"]`);
          this.log("stub: ", stub);

          const childContent = ch.getContent();
          this.log("childContent: ", childContent);

          if (stub === null) {
            return;
          }

          stub.replaceWith(childContent);
        });
        return;
      }

      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      this.log("stub: ", stub);

      const childContent = child.getContent();
      this.log("childContent: ", childContent);

      if (stub === null) {
        return;
      }

      stub.replaceWith(childContent);
    });

    return fragment.content;
  }
}
