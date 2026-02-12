import { Block } from "../../../libs/block";
import { store, STORE_EVENTS } from "../../../libs/store";
import type { Chat } from "../../../pages/chats/chatApt";

import template from "./chat-item.hbs?raw";

import "./style.scss";

export class ChatItem extends Block {
  constructor(chat: Chat) {
    super(
      template,
      {
        ...chat,
        isActive: false,
        events: {
          click: () => this.handleClick(chat),
        },
      },
      true,
    );

    store.on(STORE_EVENTS.UPDATED, () => {
      const currentChat = store.get<Chat>("selectedChat", null);

      this.setProps({ isActive: currentChat?.id === chat.id });
    });
  }

  private handleClick(chat: Chat) {
    store.set("selectedChat", chat);
  }
}
