import "./style.scss";
import { Link } from "../../components/link";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import rootPageTemplate from "./rootPage.hbs?raw";

export const ROUTES = [
  {
    path: "/",
    title: "Demo Page",
  },
  {
    path: "/login",
    title: "Login Page",
  },
  {
    path: "/signup",
    title: "Sign Up Page",
  },
  {
    path: "/profile/edit",
    title: "Profile Edit Page",
  },
  {
    path: "/profile/edit-password",
    title: "Profile Edit Password Page",
  },
  {
    path: "/not-found",
    title: "Not Found Page",
  },
  { path: "/error", title: "Error Page" },
  {
    path: "/chat",
    title: "Chat Page",
  },
  {
    path: "/profile",
    title: "Profile Page",
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
