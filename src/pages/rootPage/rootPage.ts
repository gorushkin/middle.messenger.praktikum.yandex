import Handlebars from "handlebars";

import { routesConfig } from "../../router";

import RootPageTemplate from "./rootPage.hbs?raw";

import "./style.scss";

export const renderRootPage = (): string => {
  const template = Handlebars.compile(RootPageTemplate);
  return template({ routes: routesConfig });
};
