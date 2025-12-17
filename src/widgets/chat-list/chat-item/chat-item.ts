import Handlebars from "handlebars";
import ChatItem from "./chat-item.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("chatItem", ChatItem);
