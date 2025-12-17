import Handlebars from "handlebars";
import ChatWindow from "./chat-window.hbs?raw";
import "./style.css";

Handlebars.registerPartial("chatWindow", ChatWindow);
