import { Block, type PropsAndChildren } from "../../../libs/block";
import { ChatListItems } from "../chat-list-items";

import template from "./chat-list.hbs?raw";

import "./style.scss";

export class ChatList extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(
      template,
      {
        ...propsAndChildren,
        chatListItems: new ChatListItems({}),
      },
      true,
    );
  }
}
