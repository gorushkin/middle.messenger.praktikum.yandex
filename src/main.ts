import "./components/form/input/input";
import "./components/form/formField/formField";
import "./components/form/form/form";
import "./components/button/button";
import "./layouts/formLayout/formLayout";

import { renderLoginPage } from "./pages/loginPage";
import { renderSignUpPage } from "./pages/signUpPage";

import "./style.css";

const pages = {
  login: renderLoginPage,
  signup: renderSignUpPage,
};

// const ROUTES = {
//   "/login": pages.login,
//   "/signup": pages.signup,
//   "/": pages.login,
// };

// class Router {
//   private routes: { [key: string]: () => string } = {};
// }

document.addEventListener("urlchange", (e) => {
  console.log("e: ", e);
});

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    app.innerHTML = pages.signup();
  }
});
