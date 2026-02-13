import { dateComparer } from "../libs/dateUtils";
import { store } from "../libs/store";

import type {
  FileMessage,
  GetOldMessagesResponse,
  PongMessage,
  StickerMessage,
  TextMessage,
  UserConnectedMessage,
} from "./messagesTypes";
import { WebSocketClient } from "./webSocket";

class MessagesApi {
  webSocketClient = new WebSocketClient({
    onTextMessage: this.handleTextMessage.bind(this),
    onFileMessage: this.handleFileMessage.bind(this),
    onStickerMessage: this.handleStickerMessage.bind(this),
    onOldMessages: this.handleOldMessages.bind(this),
    onPong: this.handlePong.bind(this),
    onUserConnected: this.handleUserConnected.bind(this),
  });

  connect(userId: number, chatId: number, token: string) {
    this.webSocketClient.connect(userId, chatId, token);
  }

  getMessagesHistory() {
    this.webSocketClient.getOldMessages();
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

  // Message handlers
  private handleTextMessage(message: TextMessage) {
    const history = store.get<TextMessage[]>("messagesHistory") ?? [];
    store.set("messagesHistory", [...history, message]);
  }

  private handleFileMessage(message: FileMessage) {
    console.log("MessagesApi: handleFileMessage", message);
  }

  private handleStickerMessage(message: StickerMessage) {
    console.log("MessagesApi: handleStickerMessage", message);
  }

  private handleOldMessages(messages: GetOldMessagesResponse) {
    // console.log("MessagesApi: handleOldMessages", messages);
    // const history = store.get<TextMessage[]>("messagesHistory") ?? [];
    const sortedMessages = messages.sort(dateComparer);
    store.set("messagesHistory", sortedMessages);
  }

  private handlePong(message: PongMessage) {
    console.log("MessagesApi: handlePong", message);
  }

  private handleUserConnected(message: UserConnectedMessage) {
    console.log("MessagesApi: handleUserConnected", message);
  }
}

export const messagesApi = new MessagesApi();
