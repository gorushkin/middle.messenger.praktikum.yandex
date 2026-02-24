import { Button } from "../../../components/button";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chatSettingsPopupContent.hbs?raw";

type ChatSettingsPopupContentProps = {
  onAddUserClick: () => void;
  onRemoveUserClick: () => void;
  onUpdateChatImageClick: () => void;
  onDeleteChatClick: () => void;
};

export class ChatSettingsPopupContent extends Block<ChatSettingsPopupContentProps> {
  constructor(
    propsAndChildren: PropsAndChildren<ChatSettingsPopupContentProps>,
  ) {
    const {
      onAddUserClick,
      onRemoveUserClick,
      onUpdateChatImageClick,
      onDeleteChatClick,
    } = propsAndChildren;

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

    const updateChatImageButton = new Button({
      text: "Изменить изображение чата",
      type: "button",
      variant: "link",
      className: "chat-settings-popup__button",
      events: {
        click: () => {
          onUpdateChatImageClick?.();
        },
      },
    });

    const deleteChatButton = new Button({
      text: "Удалить чат",
      type: "button",
      variant: "link",
      className:
        "chat-settings-popup__button chat-settings-popup__button--danger",
      events: {
        click: () => {
          onDeleteChatClick?.();
        },
      },
    });

    super(
      template,
      {
        ...propsAndChildren,
        addUserButton,
        removeUserButton,
        deleteChatButton,
        updateChatImageButton,
      },
      true,
    );
  }
}
