import Handlebars from "handlebars";
import ChatList from "./chat-list.hbs?raw";
import "./style.css";

Handlebars.registerPartial("chatList", ChatList);
