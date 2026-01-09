import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./button.hbs?raw";
import "./style.scss";

export class Button extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
