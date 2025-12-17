import Handlebars from "handlebars";

import { application } from "../../router";

import Link from "./link.hbs?raw";

import "./style.scss";

Handlebars.registerPartial("link", Link);

const LINK_DATA_ATTR = "link";

document.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).getAttribute("data") === LINK_DATA_ATTR) {
    const href = (e.target as HTMLAnchorElement).getAttribute("href");
    e.preventDefault();

    if (!href) {
      return;
    }

    application.updateRouteByPath(href);
    return;
  }
});
