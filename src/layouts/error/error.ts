import { Link } from "../../components/link";
import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./error.hbs?raw";

import "./style.scss";

export class ErrorLayout extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithButton = {
      ...propsAndChildren,
      errorBackLinkText: new Link({
        href: "/messenger",
        content: "Назад к чатам",
        className: "error__link",
      }),
    };
    super(template, propsWithButton, true);
  }
}
