import Handlebars from "handlebars";

import ProfileView from "./profile-view.hbs?raw";
import "./style.scss";
import "../style.scss";

Handlebars.registerPartial("profileView", ProfileView);
