import { Block, type PropsAndChildren } from "../../../libs/block";
import { store, STORE_EVENTS } from "../../../libs/store";
import type { Chat } from "../../../pages/chats/chatApt";
import { ChatItem } from "../chat-item";

import template from "./chat-list-items.hbs?raw";
import "./style.scss";

export class ChatListItems extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);

    store.on(STORE_EVENTS.UPDATED, () => {
      const items = store.get<Chat[]>("chats") || [];
      this.setProps({ items });
    });
  }

  componentDidUpdate(
    oldProps: PropsAndChildren,
    newProps: PropsAndChildren,
  ): boolean {
    const itemsChanged = oldProps.items !== newProps.items;

    if (itemsChanged && Array.isArray(newProps.items)) {
      this.children.items = newProps.items.map(
        (item: Chat) => new ChatItem(item),
      );
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
