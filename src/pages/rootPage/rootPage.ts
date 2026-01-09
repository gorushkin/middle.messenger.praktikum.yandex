import "./style.scss";
import { TextSPALink } from "../../components/textSPALink/textSPALink";
import { Block } from "../../libs/block";

import rootPageTemplate from "./rootPage.hbs?raw";

export const ROUTES = [
  {
    name: "root",
    path: "/",
    title: "Demo Page",
  },
  {
    name: "login",
    path: "/login",
    title: "Login Page",
  },
  {
    name: "signup",
    path: "/signup",
    title: "Sign Up Page",
  },
];

const routes = ROUTES.map((route) => new TextSPALink(route.path, route.title));

class RootPage extends Block {
  constructor(routes: TextSPALink[]) {
    super(
      rootPageTemplate,
      {
        routes,
      },
      true
    );
  }
}

export const rootPage = new RootPage(routes);
