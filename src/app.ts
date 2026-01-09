// import { Router } from "./router";

import { rootPage } from "./pages/rootPage";

class App {
  // router: Router;
  root = document.getElementById("app") as HTMLElement;

  onRoute = (html: string) => {
    this.root.innerHTML = html;
  };

  constructor() {
    // this.router = new Router(this.onRoute);
    // this.router.addListeners();
  }

  render() {
    this.root.replaceChildren(rootPage.getContent());

    rootPage.dispatchComponentDidMount();
  }
}

export const application = new App();
