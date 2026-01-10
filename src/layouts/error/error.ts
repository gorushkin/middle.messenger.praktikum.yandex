import { Link } from "../../components/link";
import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./error.hbs?raw";

import "./style.scss";

export class ErrorLayout extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithButton = {
      ...propsAndChildren,
      errorBackLinkText: new Link("/chat", "Назад к чатам", "error__link"),
    };
    super(template, propsWithButton, true);
  }
}
