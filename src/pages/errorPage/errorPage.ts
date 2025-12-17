import Handlebars from "handlebars";
import ErrorPageTemplate from "./errorPage.hbs?raw";

export const renderErrorPage = (): string => {
  const template = Handlebars.compile(ErrorPageTemplate);
  return template({});
};
