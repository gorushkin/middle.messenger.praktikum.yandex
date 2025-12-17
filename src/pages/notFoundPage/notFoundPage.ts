import Handlebars from "handlebars";
import NotFoundPageTemplate from "./notFoundPage.hbs?raw";

export const renderNotFoundPage = (): string => {
  const template = Handlebars.compile(NotFoundPageTemplate);
  return template({});
};
