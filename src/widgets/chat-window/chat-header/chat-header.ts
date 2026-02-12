import { Image } from "../../../components/image";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { ChatSettingsButton } from "../chatSettingsButton";

import template from "./chat-header.hbs?raw";
import "./style.scss";

export class ChatHeader extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
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
