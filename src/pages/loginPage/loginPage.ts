import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Link } from "../../components/link";
import { UserForm } from "../../components/userForm/userForm";
import { FormLayoutBlock } from "../../layouts/formLayout";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import { LoginFormFields } from "./fields";
import template from "./loginPage.hbs?raw";
import "./style.scss";
import { loginValidator, passwordValidator } from "./validators";

class LoginForm extends Form {
  constructor() {
    const fields = new LoginFormFields();

    const actions = [
      new Button({
        text: "Войти",
        type: "submit",
        className: "primary login-form__button",
      }),
      new Link("/signup", "Нет аккаунта? Регистрация", "login-form__link"),
    ];

    const formContent = new UserForm({
      fields,
      actions,
    });

    super({
      formContent,
    });

    this.addValidators({
      login: (value: string) => loginValidator(value),
      password: (value: string) => passwordValidator(value),
    });

    fields.setValidator(this.formValidator);
  }
}

class LoginPage extends Block {
  constructor() {
    super(
      template,
      {
        formLayout: new FormLayoutBlock({
          title: "Вход",
          form: new LoginForm(),
        }),
      },
      true
    );
  }
}

export const loginPage = new MainLayout({
  content: new LoginPage(),
});
