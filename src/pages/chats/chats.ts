import { Link } from "../../components/link/link";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";
import { ChatList } from "../../widgets/chat-list/chat-list";
import { ChatListItems } from "../../widgets/chat-list/chat-list-items";
import { ChatWindow } from "../../widgets/chat-window";

import template from "./chats.hbs?raw";

import "./style.scss";

class ChatsPage extends Block {
  constructor() {
    const chatListHeader = new Link({
      href: "/profile",
      content: `<span>
                   Профиль
      <img src="/arrow_right.svg" alt="Arrow Icon" />
            </span>`,
      className: "chat-list__add-chat-button",
    });

    super(
      template,
      {
        chatList: new ChatList({
          chatListHeader,
          chatListItems: new ChatListItems({}),
        }),
        chatWindow: new ChatWindow(),
      },
      true,
    );
  }
}

export class ChatPageLayout extends MainLayout {
  constructor() {
    super({
      content: new ChatsPage(),
    });
  }
}
