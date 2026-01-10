import { Block } from "../../../libs/block";

import template from "./messages-list.hbs?raw";
import "./style.scss";

export class MessageList extends Block {
  constructor() {
    super(template, {}, true);
  }
}
