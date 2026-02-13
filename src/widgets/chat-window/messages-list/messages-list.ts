import type { TextMessage } from "../../../api/messagesTypes";
import type { UserProfile } from "../../../entities/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withMessages, withUser } from "../../../libs/connect";
import { isEqual } from "../../../libs/isEqual";
import { store } from "../../../libs/store";

import { Message } from "./message";
import template from "./messages-list.hbs?raw";
import "./style.scss";

type MessagesListProps = {
  messages?: TextMessage[];
  user?: UserProfile | null;
};

class MessageList extends Block<MessagesListProps> {
  userId: number;
  constructor() {
    const user = store.get<UserProfile>("user", null);

    super(template, { messages: [], user }, true);

    this.userId = user ? user.id : -1;
  }

  private createMessageComponents(
    messages: TextMessage[] = [],
    userId: number = this.userId,
  ): Message[] {
    return messages.map(
      (msg) =>
        new Message({
          ...msg,
          isMine: msg.user_id === userId,
        }),
    );
  }

  componentDidUpdate(
    oldProps: PropsAndChildren<MessagesListProps>,
    newProps: PropsAndChildren<MessagesListProps>,
  ): boolean {
    const messagesChanged = !isEqual(
      { items: oldProps.messages },
      { items: newProps.messages },
    );

    const userChanged = !isEqual(
      { user: oldProps.user },
      { user: newProps.user },
    );

    if (userChanged) {
      this.setProps({ user: newProps.user });
    }

    if (messagesChanged || userChanged) {
      this.children.messages = this.createMessageComponents(
        newProps.messages || [],
        newProps.user ? newProps.user.id : -1,
      );
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}

export const ConnectedMessageList = withMessages(withUser(MessageList));
