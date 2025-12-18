import Handlebars from "handlebars";

import ChatInput from "./chat-input.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("chatInput", ChatInput);
