import type { TextMessage } from "../../../api/messagesTypes";
import type { UserProfile } from "../../../entities/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withMessagesAndUser } from "../../../libs/connect";
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
  private messageComponentsMap: Map<string, Message> = new Map();

  constructor() {
    const user = store.get("user", null);

    super(template, { messages: [], user }, true);

    this.userId = user ? user.id : -1;
  }

  private createMessageComponent(
    msg: TextMessage,
    userId: number = this.userId,
  ): Message {
    return new Message({
      ...msg,
      isMine: msg.user_id === userId,
    });
  }

  private updateMessages(
    messages: TextMessage[] = [],
    userId: number = this.userId,
  ) {
    const newComponents: Message[] = [];

    messages.forEach((msg) => {
      const messageId = msg.id;

      if (!this.messageComponentsMap.has(messageId)) {
        const component = this.createMessageComponent(msg, userId);
        this.messageComponentsMap.set(messageId, component);
        newComponents.push(component);
      }
    });

    if (newComponents.length > 0) {
      const existingMessages = this.children.messages as Message[];
      if (Array.isArray(existingMessages)) {
        existingMessages.push(...newComponents);
      } else {
        this.children.messages = newComponents;
      }

      this.scrollToBottom();
    }
  }

  private replaceAllMessages(
    messages: TextMessage[] = [],
    userId: number = this.userId,
  ) {
    this.messageComponentsMap.clear();

    const components = messages.map((msg) => {
      const component = this.createMessageComponent(msg, userId);
      this.messageComponentsMap.set(msg.id, component);
      return component;
    });

    this.children.messages = components;

    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this._element) {
        this._element.scrollTop = this._element.scrollHeight;
      }
    }, 0);
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

    if (userChanged && newProps.user) {
      this.userId = newProps.user.id;
      this.replaceAllMessages(newProps.messages || [], this.userId);
      return super.componentDidUpdate(oldProps, newProps);
    }

    if (messagesChanged) {
      const oldLength = oldProps.messages?.length || 0;
      const newLength = newProps.messages?.length || 0;

      if (newLength > oldLength) {
        this.updateMessages(newProps.messages || [], this.userId);
      } else {
        this.replaceAllMessages(newProps.messages || [], this.userId);
      }
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}

export const ConnectedMessageList = withMessagesAndUser(MessageList);
