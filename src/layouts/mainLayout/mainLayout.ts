import { Link } from "../../components/link";
import { Block, type PropsAndChildren } from "../../libs/block";
import { authApi } from "../../pages/loginPage/api";

import template from "./mainLayout.hbs?raw";

import "./style.scss";

export class MainLayout extends Block {
  private authApi = authApi;

  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithButton = {
      ...propsAndChildren,
      link: new Link({
        href: "/demo",
        content: "Demo Page",
        className: "main-layout__chat-link",
      }),
    };
    super(template, propsWithButton, true);

    this.onMount();
  }

  async onMount() {
    await this.authApi.getUser();
  }
}
