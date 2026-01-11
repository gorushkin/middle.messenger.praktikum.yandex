import { Form } from "../../components/form/form";
import { Block } from "../../libs/block";

import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import template from "./chat-window.hbs?raw";
import { MessageList } from "./messages-list";
import "./style.scss";
import { messageValidator } from "./validators";

class ChatForm extends Form {
  constructor() {
    const formContent = new ChatInput({});

    super({
      propsAndChildren: {
        formContent,
      },
      onSubmit: () => {
        const errors = this.formValidator.getErrors();

        const { isValid } = errors["message"];

        formContent.setProps({ isValid });
      },
    });

    formContent.setValidator(this.formValidator);

    this.formValidator.addValidators({
      message: (value: string) => messageValidator(value),
    });
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
