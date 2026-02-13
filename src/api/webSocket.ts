/* eslint-disable no-unused-vars */

import type {
  FileMessage,
  GetOldMessagesResponse,
  PongMessage,
  StickerMessage,
  TextMessage,
  UserConnectedMessage,
  WSServerResponse,
} from "./messagesTypes";
import {
  isFileMessage,
  isMessageArray,
  isPongMessage,
  isSingleMessage,
  isStickerMessage,
  isTextMessage,
  isUserConnectedMessage,
} from "./messagesTypes";

const URL = "wss://ya-praktikum.tech/ws/chats/";

const OLD_MESSAGES_COMMAND = {
  content: "0",
  type: "get old",
};

type MessageHandlers = {
  onTextMessage?: (message: TextMessage) => void;
  onFileMessage?: (message: FileMessage) => void;
  onStickerMessage?: (message: StickerMessage) => void;
  onOldMessages?: (messages: GetOldMessagesResponse) => void;
  onPong?: (message: PongMessage) => void;
  onUserConnected?: (message: UserConnectedMessage) => void;
};

export class WebSocketClient {
  private url: string = "";

  ws: WebSocket | null = null;
  handlers: MessageHandlers;

  constructor(handlers: MessageHandlers = {}) {
    this.handlers = handlers;
  }

  connect(userId: number, chatId: number, token: string): WebSocket {
    this.url = `${URL}${userId}/${chatId}/${token}`;

    const ws = new WebSocket(this.url);
    this.ws = ws;

    ws.onopen = () => {
      console.info("WebSocket connected");
      this.getOldMessages();
    };

    ws.onmessage = (event) => {
      try {
        const data: WSServerResponse = JSON.parse(event.data);

        if (isMessageArray(data)) {
          this.handlers.onOldMessages?.(data);
          return;
        }

        if (isSingleMessage(data)) {
          if (isPongMessage(data)) {
            this.handlers.onPong?.(data);
          } else if (isTextMessage(data)) {
            this.handlers.onTextMessage?.(data);
          } else if (isFileMessage(data)) {
            this.handlers.onFileMessage?.(data);
          } else if (isStickerMessage(data)) {
            this.handlers.onStickerMessage?.(data);
          } else if (isUserConnectedMessage(data)) {
            this.handlers.onUserConnected?.(data);
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.info("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return ws;
  }

  validateConnection(): asserts this is { ws: WebSocket } {
    if (!this.ws) {
      console.error("WebSocket is not connected");
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  getOldMessages() {
    this.validateConnection();

    const isReady = this.isConnected();

    if (!isReady) {
      setTimeout(() => this.getOldMessages(), 1000);
      return;
    }

    this.ws.send(JSON.stringify(OLD_MESSAGES_COMMAND));
  }

  send(data: unknown) {
    this.validateConnection();

    if (!this.isConnected()) {
      console.error("WebSocket is not ready to send messages");
      return;
    }

    this.ws.send(JSON.stringify(data));
  }

  sendPing() {
    this.send({ type: "ping" });
  }
}
