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

import { renderLoginPage } from "./pages/loginPage";
import { renderSignUpPage } from "./pages/signUpPage";
import { renderNotFoundPage } from "./pages/notFoundPage";
import { renderErrorPage } from "./pages/errorPage";

import "./style.scss";
import { renderChatsPage } from "./pages/chats";

const pages = {
  login: renderLoginPage,
  signup: renderSignUpPage,
  chat: renderChatsPage,
  notFound: renderNotFoundPage,
  error: renderErrorPage,
};

document.addEventListener("urlchange", (e) => {
  console.log("e: ", e);
});

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    app.innerHTML = pages.error();
  }
});
