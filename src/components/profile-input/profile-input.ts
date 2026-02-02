import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./profile-input.hbs?raw";

import "./style.scss";

export class ProfileInput extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
