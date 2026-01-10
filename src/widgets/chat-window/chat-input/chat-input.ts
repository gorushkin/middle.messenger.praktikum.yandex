import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chat-input.hbs?raw";
import "./style.scss";

export class ChatInput extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
