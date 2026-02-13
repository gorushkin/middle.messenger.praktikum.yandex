import type { User } from "../../entities/user/user";
import { Block, type PropsAndChildren } from "../../libs/block";
import { Button } from "../button";
import { Input } from "../input";

import template from "./createChatModal.hbs?raw";
import "./style.scss";

type CreateChatModalProps = {
  user: User;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (chatName: string, user: User) => void;
  onCancel: () => void;
};

export class CreateChatModal extends Block<CreateChatModalProps> {
  private chatNameValue = "";

  constructor(propsAndChildren: PropsAndChildren<CreateChatModalProps>) {
    const { user, onSubmit, onCancel } = propsAndChildren;

    if (!user) {
      throw new Error("User is required");
    }

    const defaultChatName = `Чат с ${user.first_name} ${user.second_name}`;

    const chatNameInput = new Input(
      {
        name: "chatName",
        type: "text",
        placeholder: "Название чата",
        className: "create-chat-modal__input",
        value: defaultChatName,
      },
      {
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.chatNameValue = target.value;
        },
      },
    );

    const cancelButton = new Button({
      text: "Отмена",
      type: "button",
      variant: "secondary",
      className: "create-chat-modal__button",
      events: {
        click: () => onCancel?.(),
      },
    });

    const submitButton = new Button({
      text: "Создать",
      type: "button",
      variant: "primary",
      className: "create-chat-modal__button",
      events: {
        click: () => {
          const chatName = this.chatNameValue || defaultChatName;
          onSubmit?.(chatName, user);
        },
      },
    });

    super(
      template,
      {
        userName: `${user.first_name} ${user.second_name} (@${user.login})`,
        chatNameInput,
        cancelButton,
        submitButton,
      },
      true,
    );

    this.chatNameValue = defaultChatName;
  }
}
