import { chatsApi, userApi } from "../../../api";
import { CreateChatModal } from "../../../components/createChatModal";
import { Modal } from "../../../components/modal/modal";
import { SearchWithResults } from "../../../components/searchWithResults";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withChats } from "../../../libs/connect";
import { getDebounce } from "../../../libs/debauncer";
import { ChatListItems } from "../chat-list-items";

import template from "./chat-list.hbs?raw";

import "./style.scss";

export class ChatList extends Block {
  debounce = getDebounce();
  private modal: Modal;

  constructor(propsAndChildren: PropsAndChildren) {
    const modal = new Modal({
      content: "",
      isVisible: false,
    });

    const searchWithResults = new SearchWithResults({
      placeholder: "Поиск",
      className: "chat-list__search",
      onInput: (value: string) => {
        this.debounce(() => {
          void userApi.searchUsers(value, "searchForNewChat");
        }, 300);
      },
      onUserClick: (user: User) => {
        this.showCreateChatModal(user);
      },
    });

    super(
      template,
      {
        ...propsAndChildren,
        searchInput: searchWithResults,
        chatListItems: new (withChats(ChatListItems))({}),
        modal,
      },
      true,
    );

    this.modal = modal;
  }

  private showCreateChatModal(user: User) {
    const createChatModal = new CreateChatModal({
      user,
      onSubmit: async (chatName: string, selectedUser: User) => {
        try {
          const chatId = await chatsApi.createChat(chatName);

          if (!chatId) {
            throw new Error("Chat ID is undefined");
          }

          await chatsApi.addUsersToChat(chatId, [selectedUser.id]);
          this.modal.hide();
        } catch (error) {
          console.error("Error creating chat:", error);
        }
      },
      onCancel: () => {
        this.modal.hide();
      },
    });

    this.modal.children.content = createChatModal;
    this.modal.show();
  }
}
