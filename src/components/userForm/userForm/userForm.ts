import "./style.scss";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./userForm.hbs?raw";

export class FormsWithValidatorsAndFields extends Block {
  constructor(template: string, propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}

export class UserForm extends FormsWithValidatorsAndFields {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren);
  }
}
