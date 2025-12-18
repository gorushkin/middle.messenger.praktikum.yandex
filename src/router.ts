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
import { renderProfilePage } from "./pages/profilePage";
import { renderRootPage } from "./pages/rootPage";
import { renderSignUpPage } from "./pages/signUpPage";
import "./style.scss";

const ROUTES = {
  root: {
    path: "/",
    title: "Demo Page",
  },
  login: {
    path: "/login",
    title: "Login Page",
  },
  signUp: {
    path: "/signup",
    title: "Sign Up Page",
  },
  chat: {
    path: "/chat",
    title: "Chat Page",
  },
  notFound: {
    path: "/not-found",
    title: "Not Found Page",
  },
  error: {
    path: "/error",
    title: "Error Page",
  },
  profile: {
    path: "/profile",
    title: "Profile Page",
  },
} as const;

export const routesConfig = Object.entries(ROUTES).map(([name, config]) => ({
  name,
  ...config,
}));

type RouteName = keyof typeof ROUTES;

const getRouteByUrl = (url: string): RouteName => {
  const routeEntry = Object.entries(ROUTES).find(
    ([, config]) => config.path === url
  );
  return routeEntry ? (routeEntry[0] as RouteName) : "notFound";
};

const pages: Record<RouteName, () => string> = {
  login: renderLoginPage,
  signUp: renderSignUpPage,
  chat: renderChatsPage,
  notFound: renderNotFoundPage,
  error: renderErrorPage,
  root: renderRootPage,
  profile: renderProfilePage,
};

export class Router {
  root = document.getElementById("app") as HTMLElement;

  route() {
    const route = getRouteByUrl(location.pathname);
    this.root.innerHTML = pages[route]();
  }

  updateRouteByPath(path?: string) {
    const newRoute = path ? getRouteByUrl(path) : "notFound";
    history.pushState({ spa: true }, "", ROUTES[newRoute].path);
    this.route();
  }
}

export const application = new Router();
