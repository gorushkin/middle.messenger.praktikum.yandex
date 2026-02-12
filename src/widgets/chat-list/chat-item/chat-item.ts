import type { Chat } from "../../../api/chatApi";
import { Block } from "../../../libs/block";
import { store } from "../../../libs/store";

import template from "./chat-item.hbs?raw";

import "./style.scss";

type ChatItemProps = Chat & {
  isActive: boolean;
  selectedChatId: number;
};

export class ChatItem extends Block<ChatItemProps> {
  id: number;
  constructor(chat: Chat) {
    super(
      template,
      {
        ...chat,
        isActive: false,
        selectedChatId: -1,
        events: {
          click: () => {
            const chatData: Chat = {
              id: this.props.id,
              title: this.props.title,
              avatar: this.props.avatar,
              unread_count: this.props.unread_count,
              last_message: this.props.last_message,
              created_by: this.props.created_by,
            };

            store.set("selectedChat", chatData);
          },
        },
      },
      true,
    );

    this.id = chat.id;
  }

  componentDidUpdate(
    oldProps: ChatItemProps,
    newProps: ChatItemProps,
  ): boolean {
    const isChanged = oldProps.selectedChatId !== newProps.selectedChatId;

    if (isChanged) {
      this.setProps({ isActive: newProps.selectedChatId === this.id });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
