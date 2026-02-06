import { Router } from "./libs/router";
import { ChatPageLayout } from "./pages/chats";
import { ErrorPageLayout } from "./pages/errorPage";
import { LoginPageLayout } from "./pages/loginPage";
import { NotFoundPageLayout } from "./pages/notFoundPage";
import { ProfileEditDataPageLayout } from "./pages/profileEditDataPage";
import { ProfileEditPasswordPageLayout } from "./pages/profileEditPasswordPage";
import { ProfilePageLayout } from "./pages/profilePage";
import { RootPageLayout } from "./pages/rootPage";
import { SignUpPageLayout } from "./pages/signUpPage";
import "./style.scss";

const router = new Router("app");

router
  .use("/", RootPageLayout)
  .use("/login", LoginPageLayout)
  .use("/signup", SignUpPageLayout)
  .use("/chat", ChatPageLayout)
  .use("/profile", ProfilePageLayout)
  .use("/profile/edit-data", ProfileEditDataPageLayout)
  .use("/profile/edit-password", ProfileEditPasswordPageLayout)
  .use("/error", ErrorPageLayout)
  .use("/not-found", NotFoundPageLayout)
  .use("/*", NotFoundPageLayout)
  .start();
