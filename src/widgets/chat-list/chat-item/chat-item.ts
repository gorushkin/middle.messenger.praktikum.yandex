import { Block } from "../../../libs/block";

import template from "./chat-item.hbs?raw";

import "./style.scss";

export class ChatItem extends Block {
  constructor(params: { count: number; time: string }) {
    super(template, params, true);
  }
}
