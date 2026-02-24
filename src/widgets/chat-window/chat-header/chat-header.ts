import type { ChatData } from "../../../api";
import { ImageWithDefault } from "../../../components/image/image";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withCurrentChat } from "../../../libs/connect";
import { ChatSettingsButton } from "../chatSettingsButton";

import template from "./chat-header.hbs?raw";
import "./style.scss";

type ChatHeaderProps = PropsAndChildren & {
  currentChat?: ChatData | null;
};

class ChatHeader extends Block {
  constructor(propsAndChildren: ChatHeaderProps) {
    const avatar = new ImageWithDefault({
      src: propsAndChildren.currentChat?.avatar ?? "",
      alt: "Chat avatar",
      className: "chat-header__avatar-img",
    });

    super(
      template,
      {
        ...propsAndChildren,
        avatar,
        chatSettingsButton: new ChatSettingsButton({}),
      },
      true,
    );
  }

  componentDidUpdate(
    oldProps: ChatHeaderProps,
    newProps: ChatHeaderProps,
  ): boolean {
    const isChanged =
      oldProps.currentChat?.avatar !== newProps.currentChat?.avatar;

    if (isChanged) {
      this.children.avatar = new ImageWithDefault({
        src: newProps.currentChat?.avatar ?? "",
        alt: "Chat avatar",
        className: "chat-header__avatar-img",
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}

export const ConnectedChatHeader = withCurrentChat(ChatHeader);
