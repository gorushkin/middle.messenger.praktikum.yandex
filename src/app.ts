import { router } from "./router";

class App {
  router = router;
  root = document.getElementById("app") as HTMLElement;

  render() {
    this.router.render();
  }
}

export const application = new App();
