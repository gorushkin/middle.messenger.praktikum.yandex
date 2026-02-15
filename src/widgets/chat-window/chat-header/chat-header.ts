import type { ChatData } from "../../../api";
import { Image } from "../../../components/image";
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
    const avatar = new Image({
      src: "/profile_default.svg",
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
}

export const ConnectedChatHeader = withCurrentChat(ChatHeader);
