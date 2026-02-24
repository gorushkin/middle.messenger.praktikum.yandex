import type { ChatData } from "../../../api";
import { Button } from "../../../components/button";
import { ChatAvatar } from "../../../components/chatAvatar";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withCurrentChat } from "../../../libs/connect";
import { isEqual } from "../../../libs/isEqual";

import template from "./updateChatAvatarModalContent.hbs?raw";

type UpdateChatAvatarModalContentProps = {
  onClose: () => void;
  imageUrl: string;
  currentChat: ChatData | null;
};

export class UpdateChatAvatarModalContent extends Block {
  constructor(
    propsAndChildren: PropsAndChildren<UpdateChatAvatarModalContentProps>,
  ) {
    const chatAvatar = new ChatAvatar({
      imageUrl: propsAndChildren.currentChat?.avatar || "",
      isEditable: true,
      onClose: () => propsAndChildren.onClose?.(),
    });

    const closeButton = new Button({
      text: "Закрыть",
      type: "button",
      variant: "primary",
      className: "user-modal__button",
      events: {
        click: () => propsAndChildren.onClose?.(),
      },
    });

    super(template, { ...propsAndChildren, chatAvatar, closeButton }, true);
  }

  componentDidUpdate(
    oldProps: PropsAndChildren<UpdateChatAvatarModalContentProps>,
    newProps: PropsAndChildren<UpdateChatAvatarModalContentProps>,
  ): boolean {
    const isChanged = !isEqual(
      { currentChat: oldProps.currentChat },
      { currentChat: newProps.currentChat },
    );

    if (isChanged) {
      this.children.chatAvatar = new ChatAvatar({
        imageUrl: newProps.currentChat?.avatar || "",
        isEditable: true,
        onClose: () => newProps.onClose?.(),
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}

export const ConnectedChatImageModal = withCurrentChat(
  UpdateChatAvatarModalContent,
);
