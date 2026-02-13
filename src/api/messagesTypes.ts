export type FileResource = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type BaseMessage = {
  id: string;
  time: string;
  user_id: number;
  content: string;
};

export type TextMessage = BaseMessage & {
  type: "message";
};

export type FileMessage = BaseMessage & {
  type: "file";
  file: FileResource;
};

export type StickerMessage = BaseMessage & {
  type: "sticker";
  file: FileResource;
};

export type UserConnectedMessage = {
  content: string;
  type: "user connected";
};

export type PongMessage = {
  type: "pong";
};

export type SingleIncomingMessage =
  | TextMessage
  | FileMessage
  | StickerMessage
  | UserConnectedMessage
  | PongMessage;

export type PingMessage = {
  type: "ping";
};

export type GetOldMessagesRequest = {
  content: string;
  type: "get old";
};

export type SendTextMessageRequest = {
  content: string;
  type: "message";
};

export type SendFileMessageRequest = {
  content: string;
  type: "file";
};

export type SendStickerMessageRequest = {
  content: string;
  type: "sticker";
};

export type OutgoingMessage =
  | PingMessage
  | GetOldMessagesRequest
  | SendTextMessageRequest
  | SendFileMessageRequest
  | SendStickerMessageRequest;

export type HistoricalMessage = {
  chat_id: number;
  time: string;
  type: "message" | "file" | "sticker";
  user_id: string;
  content: string;
  file?: FileResource;
};

export type GetOldMessagesResponse = HistoricalMessage[];

export type WSServerResponse = SingleIncomingMessage | GetOldMessagesResponse;

export const isMessageArray = (
  data: WSServerResponse,
): data is GetOldMessagesResponse => {
  return Array.isArray(data);
};

export const isSingleMessage = (
  data: WSServerResponse,
): data is SingleIncomingMessage => {
  return !Array.isArray(data) && typeof data === "object" && "type" in data;
};

export const isPongMessage = (
  data: SingleIncomingMessage,
): data is PongMessage => {
  return data.type === "pong";
};

export const isTextMessage = (
  data: SingleIncomingMessage,
): data is TextMessage => {
  return data.type === "message";
};

export const isFileMessage = (
  data: SingleIncomingMessage,
): data is FileMessage => {
  return data.type === "file";
};

export const isStickerMessage = (
  data: SingleIncomingMessage,
): data is StickerMessage => {
  return data.type === "sticker";
};

export const isUserConnectedMessage = (
  data: SingleIncomingMessage,
): data is UserConnectedMessage => {
  return data.type === "user connected";
};
