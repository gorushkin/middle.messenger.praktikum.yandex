import Handlebars from "handlebars";

import ChatsPageTemplate from "./chats.hbs?raw";
import "./style.scss";

export const renderChatsPage = (): string => {
  const template = Handlebars.compile(ChatsPageTemplate);
  return template({});
};
