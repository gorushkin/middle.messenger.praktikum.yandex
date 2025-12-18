import Handlebars from "handlebars";

import ProfileLayout from "./profileLayout.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("profileLayout", ProfileLayout);
