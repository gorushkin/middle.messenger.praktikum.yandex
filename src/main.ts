import "./components/form/input/input";
import "./components/form/formField/formField";
import "./components/form/form/form";
import "./components/button/button";
import "./components/link/link";
import "./layouts/formLayout/formLayout";
import "./layouts/error/error";
import "./widgets/chat-list/chat-list/chat-list";
import "./widgets/chat-list/chat-item/chat-item";
import "./widgets/chat-list/chat-list-items/chat-list-items";
import "./widgets/chat-window/chat-window";

import { renderChatsPage } from "./pages/chats";
import { renderErrorPage } from "./pages/errorPage";
import { renderLoginPage } from "./pages/loginPage";
import { renderNotFoundPage } from "./pages/notFoundPage";
import { renderSignUpPage } from "./pages/signUpPage";
import "./style.scss";

const pages = {
  login: renderLoginPage,
  signup: renderSignUpPage,
  chat: renderChatsPage,
  notFound: renderNotFoundPage,
  error: renderErrorPage,
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    app.innerHTML = pages.error();
  }
});
