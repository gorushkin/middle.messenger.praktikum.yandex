import "./components/form/input/input";
import "./components/form/formField/formField";
import "./components/form/form/form";
import "./components/button/button";

import { renderLoginPage } from "./pages/loginPage/loginPage";

import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  console.log("app: ", app);

  if (app) {
    app.innerHTML = renderLoginPage();
  }
});
