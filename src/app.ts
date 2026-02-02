import type { Block } from "./libs/block";
import { chatPage } from "./pages/chats";
import { errorPage } from "./pages/errorPage";
import { loginPage } from "./pages/loginPage";
import { notFoundPage } from "./pages/notFoundPage";
import { profileEditDataPage } from "./pages/profileEditDataPage";
import { profileEditPasswordPage } from "./pages/profileEditPasswordPage";
import { profilePage } from "./pages/profilePage";
import { rootPage } from "./pages/rootPage";
import { signUpPage } from "./pages/signUpPage";
import { Router, type Routes } from "./router";

export const ROUTES: Routes = {
  root: {
    path: "/",
    title: "Demo Page",
    component: rootPage,
  },
  login: {
    path: "/login",
    title: "Login Page",
    component: loginPage,
  },
  signUp: {
    path: "/signup",
    title: "Sign Up Page",
    component: signUpPage,
  },
  chat: {
    path: "/chat",
    title: "Chat Page",
    component: chatPage,
  },
  notFound: {
    path: "/not-found",
    title: "Not Found Page",
    component: notFoundPage,
  },
  error: {
    path: "/error",
    title: "Error Page",
    component: errorPage,
  },
  profile: {
    path: "/profile",
    title: "Profile Page",
    component: profilePage,
  },
  profileEditData: {
    path: "/profile/edit",
    title: "Profile Edit Page",
    component: profileEditDataPage,
  },
  profileEditPasswordPage: {
    path: "/profile/edit-password",
    title: "Profile Edit Password Page",
    component: profileEditPasswordPage,
  },
} as const;

class App {
  router: Router;
  root = document.getElementById("app") as HTMLElement;

  onRoute = (page: Block) => {
    this.root.replaceChildren(page.getContent());
    page.dispatchComponentDidMount();
  };

  constructor() {
    this.router = new Router(ROUTES, this.onRoute, {
      errorPage: ROUTES.error,
      notFoundPage: ROUTES.notFound,
    });
    this.router.addListeners();
  }

  render() {
    this.router.render();
  }
}

export const application = new App();
