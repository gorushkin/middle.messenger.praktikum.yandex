import Handlebars from "handlebars";

import Error from "./error.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("error", Error);
