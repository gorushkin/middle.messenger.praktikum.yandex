import type { ChatData } from "../../../api/chatApi";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withSelectedChat } from "../../../libs/connect";
import { isEqual } from "../../../libs/isEqual";
import { ChatItem } from "../chat-item";

import template from "./chat-list-items.hbs?raw";
import "./style.scss";

const ConnectedChatItem = withSelectedChat(ChatItem);

export class ChatListItems extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);
  }

  componentDidUpdate(
    oldProps: PropsAndChildren,
    newProps: PropsAndChildren,
  ): boolean {
    const itemsChanged = !isEqual(
      { items: oldProps.chats },
      { items: newProps.chats },
    );

    if (itemsChanged && Array.isArray(newProps.chats)) {
      this.children.items = newProps.chats.map(
        (item: ChatData) => new ConnectedChatItem(item),
      );
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
