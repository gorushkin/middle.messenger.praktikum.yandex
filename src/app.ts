import type { Block } from "./libs/block";
import { loginPage } from "./pages/loginPage";
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
  // chat: {
  //   path: "/chat",
  //   title: "Chat Page",
  // },
  // notFound: {
  //   path: "/not-found",
  //   title: "Not Found Page",
  // },
  // error: {
  //   path: "/error",
  //   title: "Error Page",
  // },
  // profile: {
  //   path: "/profile",
  //   title: "Profile Page",
  // },
  // profileEditData: {
  //   path: "/profile/edit",
  //   title: "Profile Edit Page",
  // },
  // profileEditPassword: {
  //   path: "/profile/edit-password",
  //   title: "Profile Edit Password Page",
  // },
} as const;

class App {
  router: Router;
  root = document.getElementById("app") as HTMLElement;

  onRoute = (page: Block) => {
    this.root.replaceChildren(page.getContent());
    page.dispatchComponentDidMount();
  };

  constructor() {
    this.router = new Router(ROUTES, this.onRoute);
    this.router.addListeners();
  }

  render() {
    this.router.render();
  }
}

export const application = new App();
