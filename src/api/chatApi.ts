import type { User } from "../entities/user/user";
import { HTTPTransport } from "../libs/fetcher";
import { store } from "../libs/store";

const CHATS_ENDPOINT = "/api/v2/chats";

type Id = number;

export type ChatLastMessage = {
  user: User;
  time: string;
  content: string;
  id: number;
};

export type ChatData = {
  id: Id;
  title: string;
  avatar: string | null;
  created_by: Id;
  unread_count: number;
  last_message: ChatLastMessage | null;
};
export type AddUsersToChatRequest = {
  users: Id[];
  chatId: Id;
};

class ChatsAPI {
  private chatsAPI = new HTTPTransport(CHATS_ENDPOINT);

  async fetchChats() {
    const response = await this.chatsAPI.get<ChatData[], string>("");

    if (response.ok) {
      store.set("chats", response.data);
    } else {
      store.set("chats", []);
    }
  }

  async addUsersToChat(selectedChatId: number, users: number[]) {
    const body = {
      users,
      chatId: selectedChatId,
    };

    await this.chatsAPI.put<AddUsersToChatRequest>("/users", {
      body,
    });

    store.set("selectedChatUsers", []);
    store.set("searchUsers", []);
  }

  async getChatToken() {
    const url = "/token/" + store.get<ChatData>("selectedChat", null)?.id;

    const response = await this.chatsAPI.post<{ token: string }, string>(url);

    if (response.ok) {
      store.set("chatToken", response.data.token);
    } else {
      console.error("Failed to get chat token:", response.error);
      return null;
    }
  }

  async createChat(title: string) {
    const response = await this.chatsAPI.post<{ id: Id }, string>("", {
      body: { title },
    });

    if (response.ok) {
      await this.fetchChats();
      return response.data.id;
    } else {
      console.error("Failed to create chat:", response.error);
      return null;
    }
  }
}

export const chatsApi = new ChatsAPI();
