import { messagesApi } from "../../api/messagesApi";
import type { FormValidator } from "../../components/form";
import { Form } from "../../components/form/form";
import { Block, type PropsAndChildren } from "../../libs/block";
import { withChatToken } from "../../libs/connect";
import { store } from "../../libs/store";

import { ChatHeader } from "./chat-header";
import { ChatFormInput, message } from "./chat-input/chat-input";
import template from "./chat-window.hbs?raw";
import { ChatFormWrapper } from "./chatFormWrapper";
import { ConnectedMessageList } from "./messages-list/messages-list";
import "./style.scss";
import { messageValidator } from "./validators";

class ChatFormFields extends Block {
  fields: ChatFormInput[] = [];

  constructor() {
    super(`{{{message}}}`, { message }, true);
    this.fields = [message];
  }

  setValidator(validator: FormValidator) {
    const inputs = this.fields;

    inputs.forEach((input) => {
      input.setValidator(validator);
    });
  }
}

type ChatFormValues = {
  message: string;
};

class ChatForm extends Form<ChatFormValues> {
  messagesApi = messagesApi;
  constructor() {
    const fields = new ChatFormFields();
    const formContent = new ChatFormWrapper({ fields });

    super({
      formContent,
      onSubmit: (value) => {
        messagesApi.sendMessage(value.message);
      },
    });

    this.addValidators({
      message: (value: string) => messageValidator(value),
    });

    fields.setValidator(this.formValidator);
  }
}

type ChatWindowProps = {
  chatToken?: string;
};

export class ChatWindow extends Block<ChatWindowProps> {
  constructor() {
    super(
      template,
      {
        chatHeader: new ChatHeader({}),
        chatInput: new ChatForm(),
        messageList: new ConnectedMessageList(),
      },
      true,
    );
  }

  componentDidUpdate(
    oldProps: PropsAndChildren<ChatWindowProps>,
    newProps: PropsAndChildren<ChatWindowProps>,
  ): boolean {
    const tokenChanged = oldProps.chatToken !== newProps.chatToken;

    if (tokenChanged && newProps.chatToken) {
      this.connect();
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  private connect() {
    const userId = store.get("user", null)?.id || -1;
    const chatId = store.get("selectedChat", null)?.id || -1;
    const token = store.get("chatToken");

    if (!token) {
      console.error("No chat token available");
      return;
    }

    if (userId === -1 || chatId === -1) {
      console.error("User ID or Chat ID is missing");
      return;
    }

    messagesApi.connect(userId, chatId, token);
  }
}

export const ConnectedChatWindow = withChatToken(ChatWindow);
