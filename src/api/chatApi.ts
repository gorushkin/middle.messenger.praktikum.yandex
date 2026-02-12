import type { UserProfileSearch } from "../entities/user/user";
import { HTTPTransport } from "../libs/fetcher";
import { store } from "../libs/store";

const CHATS_ENDPOINT = "/api/v2/chats";

type Id = number;

export type Chat = {
  id: Id;
  title: string;
  avatar: string | null;
  created_by: Id;
  unread_count: number;
  last_message: string | null;
};
export type AddUsersToChatRequest = {
  users: Id[];
  chatId: Id;
};

class ChatsAPI {
  private chatsAPI = new HTTPTransport(CHATS_ENDPOINT);

  async fetchChats() {
    const response = await this.chatsAPI.get<Chat[], string>("");

    if (response.ok) {
      store.set("chats", response.data);
    } else {
      store.set("chats", []);
    }
  }

  async addUsersToChat() {
    const selectedChat = store.get<Chat>("selectedChat", null);

    if (!selectedChat) {
      console.error("No chat selected");
      return;
    }

    const selectedUsers =
      store.get<UserProfileSearch[]>("selectedChatUsers") || [];

    const body = {
      users: selectedUsers.map((user) => user.id),
      chatId: selectedChat?.id || -1,
    };

    await this.chatsAPI.put<AddUsersToChatRequest>("/users", {
      body,
    });

    store.set("selectedChatUsers", []);
    store.set("searchUsers", []);
  }
}

export const chatsApi = new ChatsAPI();
