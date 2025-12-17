import Handlebars from "handlebars";

import ChatList from "./chat-list.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("chatList", ChatList);
