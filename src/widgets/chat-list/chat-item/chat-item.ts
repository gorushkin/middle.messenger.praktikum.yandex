import type { Chat } from "../../../api/chatApi";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { store } from "../../../libs/store";

import template from "./chat-item.hbs?raw";

import "./style.scss";

export class ChatItem extends Block {
  id: number;
  constructor(chat: Chat) {
    super(
      template,
      {
        ...chat,
        isActive: false,
        selectedChatId: -1,
        events: {
          click: () => this.handleClick(chat),
        },
      },
      true,
    );

    this.id = chat.id;
  }

  private handleClick(chat: Chat) {
    store.set("selectedChat", chat);
  }

  componentDidUpdate(
    oldProps: PropsAndChildren,
    newProps: PropsAndChildren,
  ): boolean {
    const isChanged = oldProps.selectedChatId !== newProps.selectedChatId;

    if (isChanged) {
      this.setProps({ isActive: newProps.selectedChatId === this.id });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
