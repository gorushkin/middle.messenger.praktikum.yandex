import "./components/form/input/input";
import "./components/form/formField/formField";
import "./components/form/form/form";
import "./components/button/button";
import "./layouts/formLayout/formLayout";
import "./layouts/error/error";
import "./widgets/chat-list/chat-list/chat-list";
import "./widgets/chat-list/chat-item/chat-item";
import "./widgets/chat-list/chat-list-items/chat-list-items";
import "./widgets/chat-window/chat-window";

import type { Block } from "./libs/block";
import "./style.scss";

export const LINK_DATA_ATTR = "spa-link";

export type RouteConfig = {
  path: string;
  title: string;
  component: Block;
};

export type Routes = Record<string, RouteConfig>;

// eslint-disable-next-line no-unused-vars
type onRoute = (page: Block) => void;

export class Router {
  onRouteChange: onRoute;
  routes: Routes;
  constructor(routes: Routes, onRender: onRoute) {
    this.onRouteChange = onRender;
    this.routes = routes;
  }

  getRouteByUrl(routes: Routes, url: string): RouteConfig {
    const routeEntry = Object.entries(routes).find(
      ([, config]) => config.path === url
    );
    if (!routeEntry) {
      throw new Error(`Route not found for url: ${url}`);
    }
    return routeEntry[1];
  }

  route() {
    const route = this.getRouteByUrl(this.routes, location.pathname);
    this.onRouteChange(route.component);
  }

  updateRouteByPath(path?: string) {
    const route = this.getRouteByUrl(this.routes, path || location.pathname);
    history.pushState({ spa: true }, "", route.path);
    this.route();
  }

  render() {
    this.route();
  }

  addListeners() {
    document.addEventListener("click", (e) => {
      const link = (e.target as HTMLElement).closest(
        `a[data=${LINK_DATA_ATTR}]`
      );

      if (!link) {
        return;
      }

      e.preventDefault();

      if (link.getAttribute("data") === LINK_DATA_ATTR) {
        const href = link.getAttribute("href");

        if (!href) {
          return;
        }

        this.updateRouteByPath(href);
        return;
      }
    });

    window.addEventListener("popstate", () => {
      this.route();
    });
  }
}
