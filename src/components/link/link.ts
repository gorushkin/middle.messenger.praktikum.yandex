import Handlebars from "handlebars";

import { application } from "../../router";

import Link from "./link.hbs?raw";

import "./style.scss";

Handlebars.registerPartial("link", Link);

const LINK_DATA_ATTR = "link";

document.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement).closest("a");

  if (!link) {
    return;
  }

  e.preventDefault();

  if (link.getAttribute("data") === LINK_DATA_ATTR) {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    application.updateRouteByPath(href);
    return;
  }
});
