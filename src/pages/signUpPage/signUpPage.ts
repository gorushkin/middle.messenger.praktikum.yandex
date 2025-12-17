import Handlebars from "handlebars";
import SignUpPageTemplate from "./signUpPage.hbs?raw";
import "./style.scss";

export const renderSignUpPage = (): string => {
  const template = Handlebars.compile(SignUpPageTemplate);
  return template({});
};
