import Handlebars from "handlebars";

import Profile from "./profile.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("profile", Profile);
