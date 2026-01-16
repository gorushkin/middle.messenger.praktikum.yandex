import type { FormValidator } from "../../components/form";
import { Form } from "../../components/form/form";
import { Block } from "../../libs/block";

import { ChatHeader } from "./chat-header";
import {
  ChatFormInput,
  ChatFormWrapper,
  message,
} from "./chat-input/chat-input";
import template from "./chat-window.hbs?raw";
import { MessageList } from "./messages-list";
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

class ChatForm extends Form {
  constructor() {
    const fields = new ChatFormFields();
    const formContent = new ChatFormWrapper({ fields });

    super({
      formContent,
    });

    this.addValidators({
      message: (value: string) => messageValidator(value),
    });

    fields.setValidator(this.formValidator);
  }
}

export class ChatWindow extends Block {
  constructor() {
    super(
      template,
      {
        chatHeader: new ChatHeader({}),
        chatInput: new ChatForm(),
        messageList: new MessageList(),
      },
      true
    );
  }
}
