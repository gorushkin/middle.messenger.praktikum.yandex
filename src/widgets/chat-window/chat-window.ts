import { Form } from "../../components/form/";
import { Block } from "../../libs/block";

import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import template from "./chat-window.hbs?raw";
import { MessageList } from "./messages-list";
import "./style.scss";

export class ChatWindow extends Block {
  constructor() {
    super(
      template,
      {
        chatHeader: new ChatHeader({}),
        chatInput: new Form({
          formContent: new ChatInput({}),
        }),
        messageList: new MessageList(),
      },
      true
    );
  }
}
