import Handlebars from "handlebars";
import ChatListItems from "./chat-list-items.hbs?raw";
import "./style.css";

Handlebars.registerPartial("chatListItems", ChatListItems);
