import { dateComparer } from "../libs/dateUtils";
import { messagesStore, store } from "../libs/store";

import type {
  FileMessage,
  GetOldMessagesResponse,
  PongMessage,
  StickerMessage,
  TextMessage,
  UserConnectedMessage,
} from "./messagesTypes";
import { WebSocketClient } from "./webSocket";

class ChatManager {
  private chats = new Map<number, MessagesApi>();

  addChat(userId: number, chatId: number, token: string) {
    if (this.chats.has(chatId)) {
      return;
    }

    const chat = new MessagesApi(userId, chatId, token);
    chat.connect();
    this.chats.set(chatId, chat);
  }

  sendMessage(value: string) {
    const selectedChat = store.get("selectedChat", null);

    const id = selectedChat?.id;

    if (!id) {
      console.error("No selected chat ID available");
      return;
    }

    const chat = this.chats.get(id);

    if (!chat) {
      console.error("No chat available for the selected chat ID");
      return;
    }

    chat.sendMessage(value);
  }

  removeChat(chatId: number) {
    const chat = this.chats.get(chatId);

    if (chat) {
      chat.disconnect();
      this.chats.delete(chatId);
    }
  }

  disconnect() {
    this.chats.forEach((wsClient) => wsClient.disconnect());
    this.chats.clear();
  }
}

class MessagesApi {
  webSocketClient = new WebSocketClient({
    onTextMessage: this.handleTextMessage.bind(this),
    onFileMessage: this.handleFileMessage.bind(this),
    onStickerMessage: this.handleStickerMessage.bind(this),
    onOldMessages: this.handleOldMessages.bind(this),
    onPong: this.handlePong.bind(this),
    onUserConnected: this.handleUserConnected.bind(this),
  });

  userId: number;
  chatId: number;
  token: string;

  constructor(userId: number, chatId: number, token: string) {
    this.chatId = chatId;
    this.userId = userId;
    this.token = token;
  }

  connect() {
    this.webSocketClient.connect(this.userId, this.chatId, this.token);
  }

  sendMessage(text: string) {
    const message = {
      content: text,
      type: "message",
    };
    this.webSocketClient.send(message);
  }

  sendFile(resourceId: string) {
    const message = {
      content: resourceId,
      type: "file",
    };
    this.webSocketClient.send(message);
  }

  sendSticker(stickerId: string) {
    const message = {
      content: stickerId,
      type: "sticker",
    };
    this.webSocketClient.send(message);
  }

  ping() {
    this.webSocketClient.sendPing();
  }

  private handleTextMessage(message: TextMessage) {
    const history = messagesStore.getMessages(this.chatId);
    messagesStore.setMessages(this.chatId, [...history, message]);
  }

  private handleFileMessage(message: FileMessage) {
    console.info("MessagesApi: handleFileMessage", message);
  }

  private handleStickerMessage(message: StickerMessage) {
    console.info("MessagesApi: handleStickerMessage", message);
  }

  private handleOldMessages(messages: GetOldMessagesResponse) {
    const sortedMessages = messages.sort(dateComparer);
    messagesStore.setMessages(this.chatId, sortedMessages);
  }

  private handlePong(message: PongMessage) {
    console.info("MessagesApi: handlePong", message);
  }

  private handleUserConnected(message: UserConnectedMessage) {
    console.info("MessagesApi: handleUserConnected", message);
  }

  disconnect() {
    this.webSocketClient.closeConnection();
  }
}

export const chatService = new ChatManager();
