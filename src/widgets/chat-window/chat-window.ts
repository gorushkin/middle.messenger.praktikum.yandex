import Handlebars from "handlebars";
import ChatWindow from "./chat-window.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("chatWindow", ChatWindow);
