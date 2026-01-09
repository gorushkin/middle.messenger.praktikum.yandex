import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./form.hbs?raw";

import "./style.scss";

export class Form extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
