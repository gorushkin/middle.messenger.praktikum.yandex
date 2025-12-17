import Handlebars from "handlebars";

import LoginPageTemplate from "./loginPage.hbs?raw";
import "./style.scss";

export const renderLoginPage = (): string => {
  const template = Handlebars.compile(LoginPageTemplate);
  return template({});
};
