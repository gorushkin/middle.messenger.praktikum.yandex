import "./components/form/input/input";
import "./components/form/formField/formField";
import "./components/form/form/form";
import "./components/button/button";
import "./components/link/link";
import "./layouts/formLayout/formLayout";
import "./layouts/error/error";
import "./layouts/mainLayout/mainLayout";
import "./widgets/chat-list/chat-list/chat-list";
import "./widgets/chat-list/chat-item/chat-item";
import "./widgets/chat-list/chat-list-items/chat-list-items";
import "./widgets/chat-window/chat-window";
import "./widgets/profile/profile";
import "./widgets/profile/profile-input/profile-input";

import "./style.scss";
import "./variables.scss";
import { application } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  history.replaceState({ spa: true }, "", location.pathname);

  application.route();
});

window.addEventListener("popstate", () => {
  application.route();
});
