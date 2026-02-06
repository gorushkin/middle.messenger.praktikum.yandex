import { Route, type BlockConstructor } from "./route";

export const LINK_DATA_ATTR = "spa-link";

export class Router {
  private static __instance: Router | null = null;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructor) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);
    return this;
  }

  start() {
    this.addListeners();
    this._onRoute(window.location.pathname);
  }

  private addListeners() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    document.addEventListener("click", (e) => {
      const link = (e.target as HTMLElement).closest(
        `a[data=${LINK_DATA_ATTR}]`,
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

        this.go(href);
      }
    });
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      throw new Error("Not found route is not defined");
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this.renderRoute(route);
  }

  renderRoute(route: Route) {
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
