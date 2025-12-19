import Handlebars from "handlebars";

import ProfileViewEditData from "./profile-edit-data.hbs?raw";
import "./style.scss";

Handlebars.registerPartial("profileEditData", ProfileViewEditData);
