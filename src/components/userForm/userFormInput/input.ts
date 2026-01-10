import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./input.hbs?raw";

import "./style.scss";

export class Input extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
