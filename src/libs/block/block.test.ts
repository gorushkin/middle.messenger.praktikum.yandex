import { expect } from "chai";
import { before, after, beforeEach, describe, it } from "mocha";
import sinon from "sinon";
import { JSDOM } from "jsdom";
import { Block, type PropsAndChildren } from "../block/block.ts";

const PARENT_BLOCK_ID = "PARENT_BLOCK_ID";
const CHILD_BLOCK_ID = "CHILD_BLOCK_ID";

class TestBlock extends Block {
  constructor(params: PropsAndChildren = {}) {
    super(`<div data-id="${PARENT_BLOCK_ID}">{{text}}</div>`, {
      text: PARENT_BLOCK_ID,
      ...params,
    });
  }
}

class TestParentBlock extends Block {
  constructor(params: PropsAndChildren = {}) {
    super(`<div data-id="${PARENT_BLOCK_ID}">{{{child}}}</div>`, {
      child: params.child,
      ...params,
    });
  }
}

class TestChildBlock extends Block {
  constructor(params: PropsAndChildren = {}) {
    super(`<div data-id="${CHILD_BLOCK_ID}">{{text}}</div>`, {
      text: "Child Block",
      ...params,
    });
  }
}

class TestBlockWithDidMount extends Block {
  constructor(params: PropsAndChildren = {}) {
    super(`<div data-id="${PARENT_BLOCK_ID}">{{text}}</div>`, {
      text: PARENT_BLOCK_ID,
      ...params,
    });
  }

  componentDidMount() {}
}

class TestParentBlockWithDidMount extends Block {
  constructor(params: PropsAndChildren = {}) {
    super(`<div data-id="${PARENT_BLOCK_ID}">{{{child}}}</div>`, {
      child: params.child,
      ...params,
    });
  }

  componentDidMount() {}
}

const getIdElement = (id: string): Element | null => {
  const el = document.querySelector(`[data-id="${id}"]`);
  return el || null;
};

describe("Block", () => {
  before(() => {
    const { window } = new JSDOM("<!doctype html><html><body></body></html>");

    (global as any).window = window as unknown as Window & typeof globalThis;
    (global as any).document = window.document;
    (global as any).DocumentFragment = window.DocumentFragment;
    (global as any).HTMLElement = window.HTMLElement;
  });

  after(() => {
    (global as any).window = undefined;
    (global as any).document = undefined;
    (global as any).DocumentFragment = undefined;
    (global as any).HTMLElement = undefined;
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders simple block with text", () => {
    const block = new TestBlock();
    document.body.appendChild(block.getContent());

    const el = getIdElement(PARENT_BLOCK_ID);
    expect(el).to.not.be.null;
    expect(el?.textContent).to.equal(PARENT_BLOCK_ID);
  });

  it("renders block with child component", () => {
    const child = new TestChildBlock();
    const parent = new TestParentBlock({ child });

    document.body.appendChild(parent.getContent());

    const parentEl = getIdElement(PARENT_BLOCK_ID);
    const childEl = getIdElement(CHILD_BLOCK_ID);

    expect(parentEl).to.not.be.null;
    expect(childEl).to.not.be.null;
    expect(childEl?.textContent).to.equal("Child Block");
    expect(parentEl?.contains(childEl!)).to.equal(true);
  });

  it("should trigger init method on block creation", () => {
    const initSpy = sinon.spy(TestBlock.prototype, "init");
    const block = new TestBlock();

    expect(initSpy.calledOnce).to.be.true;
    initSpy.restore();
  });

  it("re-renders and updates content when setProps is called", () => {
    const renderSpy = sinon.spy(TestBlock.prototype as any, "_render");
    const block = new TestBlock({ text: "Initial" });

    document.body.appendChild(block.getContent());

    block.setProps({ text: "Updated" });

    const el = getIdElement(PARENT_BLOCK_ID);
    expect(renderSpy.callCount).to.equal(2);
    expect(el?.textContent).to.equal("Updated");

    renderSpy.restore();
  });

  it("keeps single event listener after re-render", () => {
    const clickSpy = sinon.spy();
    const block = new TestBlock({
      events: {
        click: clickSpy,
      },
    });

    document.body.appendChild(block.getContent());

    const clickEvent = new window.MouseEvent("click", { bubbles: true });

    block.getContent().dispatchEvent(clickEvent);
    expect(clickSpy.callCount).to.equal(1);

    block.setProps({ text: "Changed" });
    block.getContent().dispatchEvent(clickEvent);

    expect(clickSpy.callCount).to.equal(2);
  });
});
