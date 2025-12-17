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
import { renderRootPage } from "./pages/rootPage";
import { renderSignUpPage } from "./pages/signUpPage";
import "./style.scss";

type Route = "login" | "signUp" | "chat" | "notFound" | "error" | "root";

const RoutesMap: Record<Route, string> = {
  root: "/",
  login: "/login",
  signUp: "/signup",
  chat: "/chat",
  notFound: "/not-found",
  error: "/error",
};

const pages: Record<Route, () => string> = {
  login: renderLoginPage,
  signUp: renderSignUpPage,
  chat: renderChatsPage,
  notFound: renderNotFoundPage,
  error: renderErrorPage,
  root: renderRootPage,
};

export class Router {
  route: keyof typeof RoutesMap = "root";
  root = document.getElementById("app") as HTMLElement;

  updateRoute(newRoute: keyof typeof RoutesMap) {
    this.route = newRoute;
    this.render();
  }

  render() {
    this.root.innerHTML = pages[this.route]();
  }

  updateRouteByPath(path?: string) {
    const newRoute = this.getRouteByPath(path);
    this.updateRoute(newRoute);
  }

  private getRouteByPath(path?: string): Route {
    const routeEntry = Object.entries(RoutesMap).find(
      ([, routePath]) => routePath === path
    );

    if (routeEntry) {
      return routeEntry[0] as Route;
    }
    return "notFound";
  }
}

export const application = new Router();
