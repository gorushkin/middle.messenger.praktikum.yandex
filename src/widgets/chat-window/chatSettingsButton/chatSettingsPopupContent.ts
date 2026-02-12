import { Button } from "../../../components/button";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chatSettingsPopupContent.hbs?raw";

type ChatSettingsPopupContentProps = {
  onAddUserClick: () => void;
  onRemoveUserClick: () => void;
};

export class ChatSettingsPopupContent extends Block<ChatSettingsPopupContentProps> {
  constructor(
    propsAndChildren: PropsAndChildren<ChatSettingsPopupContentProps>,
  ) {
    const { onAddUserClick, onRemoveUserClick } = propsAndChildren;

    const addUserButton = new Button({
      text: "Добавить пользователя",
      type: "button",
      variant: "link",
      className: "chat-settings-popup__button",
      events: {
        click: () => {
          onAddUserClick?.();
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
          onRemoveUserClick?.();
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
