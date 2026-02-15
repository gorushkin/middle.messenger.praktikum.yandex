import { chatsApi } from "../../api";
import { Link } from "../../components/link/link";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";
import { withSelectedChat } from "../../libs/connect";
import { ChatList } from "../../widgets/chat-list/chat-list";
import { ConnectedChatWindow } from "../../widgets/chat-window/chat-window";

import template from "./chats.hbs?raw";

import "./style.scss";

type ChatsPageProps = {
  selectedChatId?: number;
};

class ChatsPage extends Block<ChatsPageProps> {
  api = chatsApi;

  constructor(params: ChatsPageProps) {
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
        selectedChatId: params.selectedChatId ?? -1,
        chatList: new ChatList({
          chatListHeader,
        }),
        chatWindow: new ConnectedChatWindow(),
      },
      true,
    );

    this.onMount();
  }

  async onMount() {
    void this.api.fetchChats();
  }
}

export class ChatPageLayout extends MainLayout {
  constructor() {
    super({
      content: new (withSelectedChat(ChatsPage))(),
    });
  }
}
