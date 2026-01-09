import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./formField.hbs?raw";
import "./style.scss";

export class FormField extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
