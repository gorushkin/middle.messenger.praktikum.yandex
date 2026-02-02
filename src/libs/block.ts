import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";

import type { FormValidator } from "../components/form";

import { EventBus } from "./eventBus";

type Props<T extends Record<string, unknown> = Record<string, unknown>> = T;

type Children = {
  [key: string]: Block | Block[];
};

export type PropsAndChildren<
  P extends Record<string, unknown> = Record<string, unknown>
> = Partial<P> & {
  [key: string]: Block | Block[] | unknown;
};

export class Block<
  P extends Record<string, unknown> = Record<string, unknown>
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element: HTMLElement | null = null;
  props: Props<P>;
  eventBus: EventBus;

  template: string;

  compiler = Handlebars.compile;

  _id: string | null;

  children: Children = {};

  constructor(
    template: string = "",
    propsAndChildren: PropsAndChildren<P> = {} as PropsAndChildren<P>,
    withInternalID = false
  ) {
    const eventBus = new EventBus();
    this.template = template;

    const { children, props } = this._getChildren(propsAndChildren);

    this.props = this._makePropsProxy(props);
    this._id = withInternalID ? makeUUID() : null;

    this.eventBus = eventBus;

    this.children = children;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: PropsAndChildren<P>): {
    children: Children;
    props: Props<P>;
  } {
    const children: Children = {};
    const props: Record<string, unknown> = {};

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

    return { children, props: props as Props<P> };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      (oldProps: unknown, newProps: unknown) => {
        this._componentDidUpdate(oldProps as Props<P>, newProps as Props<P>);
      }
    );
  }

  init() {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _addEvents() {
    const { events = {} } = this.props as {
      events?: Record<string, EventListener>;
    };

    Object.entries(events).forEach(([eventName, handler]) => {
      this._element?.addEventListener(eventName, handler);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as {
      events?: Record<string, EventListener>;
    };

    Object.entries(events).forEach(([eventName, handler]) => {
      this._element?.removeEventListener(eventName, handler);
    });
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

  _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    const areEqual = JSON.stringify(oldProps) === JSON.stringify(newProps);
    return !areEqual;
  }

  setProps = (nextProps: Partial<Props<P>>) => {
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const newElement = this.render().firstElementChild as HTMLElement;

    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
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

  _makePropsProxy(props: Props<P>): Props<P> {
    const proxy = new Proxy(props as Record<string, unknown>, {
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

    return proxy as Props<P>;
  }

  _createDocumentElement(): HTMLTemplateElement {
    const element = document.createElement("template");

    if (this._id) {
      element.setAttribute("data-id", this._id);
    }

    return element as HTMLTemplateElement;
  }

  compile() {
    const propsAndStubs: Record<string, unknown> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (item: Block) => `<div data-id="${item._id}"></div>`
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement() as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(this.template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="${ch._id}"]`);

          const childContent = ch.getContent();

          if (stub === null) {
            return;
          }

          stub.replaceWith(childContent);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        const childContent = child.getContent();

        if (stub === null) {
          return;
        }

        stub.replaceWith(childContent);
      }
    });

    return fragment.content;
  }
}

export class InputBlock extends Block {
  formValidator: FormValidator | null = null;
  name: string = "";

  constructor(
    template: string = "",
    propsAndChildren: PropsAndChildren = {} as PropsAndChildren,
    withInternalID = false
  ) {
    super(template, propsAndChildren, withInternalID);
    this.name = String(propsAndChildren.name || "");
  }

  setValidator(validator: FormValidator) {
    this.formValidator = validator;
  }

  // eslint-disable-next-line no-unused-vars
  validate(_value: string) {
    throw new Error("Method not implemented.");
  }
}
