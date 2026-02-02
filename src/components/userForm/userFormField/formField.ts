import { InputBlock, type PropsAndChildren } from "../../../libs/block";

import template from "./formField.hbs?raw";
import "./style.scss";

export class UserFormField extends InputBlock {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
