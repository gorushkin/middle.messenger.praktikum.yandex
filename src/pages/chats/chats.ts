import { Link } from "../../components/link/link";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";
import { ChatList } from "../../widgets/chat-list/chat-list";
import { ChatListItems } from "../../widgets/chat-list/chat-list-items";

import template from "./chats.hbs?raw";

import "./style.scss";

const chatListHeader = new Link(
  "/profile",
  `<span>
                   Профиль
      <img src="/arrow_right.svg" alt="Arrow Icon" />
            </span>`,
  "chat-list__add-chat-button"
);

class ChatsPage extends Block {
  constructor() {
    super(
      template,
      {
        chatList: new ChatList({
          chatListHeader,
          chatListItems: new ChatListItems({}),
        }),
      },
      true
    );
  }
}

export const chatPage = new MainLayout({
  content: new ChatsPage(),
});
