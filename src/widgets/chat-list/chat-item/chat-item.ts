import { chatsApi, type ChatData } from "../../../api/chatApi";
import { Block } from "../../../libs/block";
import { store } from "../../../libs/store";

import template from "./chat-item.hbs?raw";

import "./style.scss";

type ChatItemProps = ChatData & {
  isActive: boolean;
  selectedChatId: number;
};

export class ChatItem extends Block<ChatItemProps> {
  id: number;
  constructor(chat: ChatData) {
    super(
      template,
      {
        ...chat,
        isActive: false,
        selectedChatId: -1,
        events: {
          click: async () => {
            const chatData: ChatData = {
              id: this.props.id,
              title: this.props.title,
              avatar: this.props.avatar,
              unread_count: this.props.unread_count,
              last_message: this.props.last_message,
              created_by: this.props.created_by,
            };

            store.set("selectedChat", chatData);

            await chatsApi.getChatToken();
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
