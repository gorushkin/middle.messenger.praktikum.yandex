import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./userForm.hbs?raw";

import "./style.scss";

export class UserForm extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
