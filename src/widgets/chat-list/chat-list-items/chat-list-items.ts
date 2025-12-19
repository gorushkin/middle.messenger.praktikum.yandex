import Handlebars from "handlebars";

import ChatListItems from "./chat-list-items.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("chatListItems", ChatListItems);
