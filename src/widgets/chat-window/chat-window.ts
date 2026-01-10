import { Form } from "../../components/form/form";
import { Block } from "../../libs/block";

import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import template from "./chat-window.hbs?raw";
import { MessageList } from "./messages-list";

import "./style.scss";

class ChatForm extends Form {
  constructor() {
    const formContent = new ChatInput(
      {},
      {
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;

          const isValid = this.formValidator.validateField(
            "message",
            target.value
          );
          formContent.setProps({ isValid });
        },
      }
    );

    super({
      propsAndChildren: {
        formContent,
      },
      onSubmit: () => {
        const errors = this.formValidator.getErrors();

        const isValid = !errors["message"];

        formContent.setProps({ isValid });
      },
    });

    this.formValidator.addValidator(
      "message",
      (value: string) => value.trim().length > 0
    );
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
