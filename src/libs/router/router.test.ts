import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import sinon, { type SinonSpy } from "sinon";
import { JSDOM } from "jsdom";

import { Router } from "./router.ts";
import { Block } from "../block";
import { Route } from "./route.ts";

const Routes = {
  SignIn: "/",
  SignUp: "/sign-up",
};

class MockBlock extends Block {
  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.textContent = "mock";
    fragment.appendChild(div);
    return fragment;
  }
}

describe("Router", () => {
  let router: Router;
  let pushSpy: SinonSpy;
  let backSpy: SinonSpy;
  let forwardSpy: SinonSpy;

  beforeEach(() => {
    const { window } = new JSDOM(
      '<!doctype html><html><body><div id="root"></div></body></html>',
      {
        url: "http://localhost",
      },
    );

    (global as any).window = window as unknown as Window & typeof globalThis;
    (global as any).document = window.document;

    router = new Router("root");

    pushSpy = sinon.spy(window.history, "pushState");
    backSpy = sinon.spy(window.history, "back");
    forwardSpy = sinon.spy(window.history, "forward");
  });

  afterEach(() => {
    pushSpy.restore();
    backSpy.restore();
    forwardSpy.restore();
    sinon.restore();
  });

  it("Should register a route and return it with getRoute", () => {
    router.use(Routes.SignIn, MockBlock);

    const found = router.getRoute(Routes.SignIn);

    expect(found).to.be.instanceOf(Route);
    expect(found?.pathname).to.equal(Routes.SignIn);
  });

  it("go should call history.pushState and change the current route", () => {
    router.use(Routes.SignIn, MockBlock);
    router.use(Routes.SignUp, MockBlock);
    router.start();

    router.go(Routes.SignUp);

    expect(pushSpy.calledWith({}, "", Routes.SignUp)).to.equal(true);
    expect(router.currentRoutePath).to.equal(Routes.SignUp);
  });

  it("go should throw if the route is not registered", () => {
    router.use(Routes.SignIn, MockBlock);
    router.start();

    expect(() => router.go("/missing" as any)).to.throw(
      "Not found route is not defined",
    );
  });

  it("back should call history.back", () => {
    router.back();
    expect(backSpy.calledOnce).to.equal(true);
  });

  it("forward should call history.forward", () => {
    router.forward();
    expect(forwardSpy.calledOnce).to.equal(true);
  });
});
