import Handlebars from "handlebars";
import ChatItem from "./chat-item.hbs?raw";
import "./style.css";

Handlebars.registerPartial("chatItem", ChatItem);
