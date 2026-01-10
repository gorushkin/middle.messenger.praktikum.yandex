import { Block, type PropsAndChildren } from "../../../libs/block";
import { ChatItem } from "../chat-item";

import template from "./chat-list-items.hbs?raw";
import "./style.scss";

const items = [
  { count: 3, time: "12:00", name: "Chat 1", lastMessage: "Last message" },
  { count: 23, time: "12:00", name: "Chat 2", lastMessage: "Hello" },
].map((item) => new ChatItem(item));

export class ChatListItems extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithChildren = {
      ...propsAndChildren,
      items,
    };
    super(template, propsWithChildren, true);
  }
}
