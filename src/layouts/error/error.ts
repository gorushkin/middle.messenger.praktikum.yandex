import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./error.hbs?raw";

import "./style.scss";

export class ErrorLayout extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithButton = {
      ...propsAndChildren,
    };
    super(template, propsWithButton, true);
  }
}
