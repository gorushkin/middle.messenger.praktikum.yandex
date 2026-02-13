import type { TextMessage } from "../../../../api/messagesTypes";
import { Block, type PropsAndChildren } from "../../../../libs/block";

import template from "./message.hbs?raw";
import "./style.scss";

export class Message extends Block<TextMessage> {
  constructor(propsAndChildren: PropsAndChildren<TextMessage>) {
    super(template, propsAndChildren, true);
  }
}
