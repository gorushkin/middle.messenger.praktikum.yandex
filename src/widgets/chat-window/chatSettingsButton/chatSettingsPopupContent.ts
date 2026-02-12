import { Button } from "../../../components/button";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chatSettingsPopupContent.hbs?raw";

export class ChatSettingsPopupContent extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const addUserButton = new Button({
      text: "Добавить пользователя",
      type: "button",
      variant: "link",
      className: "chat-settings-popup__button",
      events: {
        click: () => {
          console.log("Добавить пользователя");
        },
      },
    });

    const removeUserButton = new Button({
      text: "Удалить пользователя",
      type: "button",
      variant: "link",
      className:
        "chat-settings-popup__button chat-settings-popup__button--danger",
      events: {
        click: () => {
          console.log("Удалить пользователя");
        },
      },
    });

    super(
      template,
      {
        ...propsAndChildren,
        addUserButton,
        removeUserButton,
      },
      true,
    );
  }
}
