import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chat-header.hbs?raw";
import "./style.scss";

export class ChatHeader extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }
}
