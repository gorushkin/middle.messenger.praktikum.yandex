import Handlebars from "handlebars";

import MessageList from "./messages-list.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("messageList", MessageList);
