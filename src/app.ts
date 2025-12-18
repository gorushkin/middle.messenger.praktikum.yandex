import { Router } from "./router";

class App {
  router: Router;
  root = document.getElementById("app") as HTMLElement;

  onRoute = (html: string) => {
    this.root.innerHTML = html;
  };

  constructor() {
    this.router = new Router(this.onRoute);
    this.router.addListeners();
  }

  render() {
    this.router.render();
  }
}

export const application = new App();
