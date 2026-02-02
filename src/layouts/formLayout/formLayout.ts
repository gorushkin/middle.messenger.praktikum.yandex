import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./formLayout.hbs?raw";

import "./style.scss";

export class FormLayoutBlock extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
