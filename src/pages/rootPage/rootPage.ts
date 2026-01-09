import "./style.scss";
import { Link } from "../../components/link";
import { MainLayout } from "../../layouts/mainLayout";
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

const routes = ROUTES.map((route) => new Link(route.path, route.title));

class RootPage extends Block {
  constructor(routes: Link[]) {
    super(
      rootPageTemplate,
      {
        routes,
      },
      true
    );
  }
}

export const rootPage = new MainLayout({
  content: new RootPage(routes),
});
