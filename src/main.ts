import "./components/form/input/input";
import "./components/form/formField/formField";
import "./components/form/form/form";
import "./components/button/button";
import "./components/link/link";
import "./components/profileAvatar/profileAvatar";
import "./layouts/formLayout/formLayout";
import "./layouts/error/error";
import "./layouts/mainLayout/mainLayout";
import "./layouts/profileLayout/profileLayout";
import "./widgets/chat-list/chat-list/chat-list";
import "./widgets/chat-list/chat-item/chat-item";
import "./widgets/chat-list/chat-list-items/chat-list-items";
import "./widgets/chat-window/chat-window";
import "./widgets/chat-window/chat-header/chat-header";
import "./widgets/chat-window/messages-list/messages-list";
import "./widgets/chat-window/chat-input/chat-input";
import "./widgets/profile/profile-view/profile-view";
import "./widgets/profile/profile-edit-data/profile-edit-data";
import "./widgets/profile/profile-edit-password/profile-edit-password";
import "./components/profile-input/profile-input";

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
