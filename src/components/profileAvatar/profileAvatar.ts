import { Block } from "../../libs/block";

import template from "./profileAvatar.hbs?raw";

import "./style.scss";

export class ProfileAvatar extends Block {
  constructor() {
    super(template, {}, true);
  }
}
