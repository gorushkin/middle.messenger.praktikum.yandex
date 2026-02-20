import { authApi } from "../../api";
// import { Link } from "../../components/link";
import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./mainLayout.hbs?raw";

import "./style.scss";

export class MainLayout extends Block {
  private authApi = authApi;
  private isRoutePrivate = true;
  constructor(propsAndChildren: PropsAndChildren, isRoutePrivate = true) {
    const propsWithButton = {
      ...propsAndChildren,
      // link: new Link({
      //   href: "/demo",
      //   content: "Demo Page",
      //   className: "main-layout__chat-link",
      // }),
    };
    super(template, propsWithButton, true);

    this.isRoutePrivate = isRoutePrivate;
    this.onMount();
  }

  async onMount() {
    await this.authApi.getUser(this.isRoutePrivate);
  }
}
