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
}

export const chatsApi = new ChatsAPI();
