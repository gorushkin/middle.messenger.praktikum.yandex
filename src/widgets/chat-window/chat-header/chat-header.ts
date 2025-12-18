import Handlebars from "handlebars";

import ChatHeader from "./chat-header.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("chatHeader", ChatHeader);
