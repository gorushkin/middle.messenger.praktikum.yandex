import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Link } from "../../components/link";
import { UserForm } from "../../components/userForm/userForm";
import { FormLayoutBlock } from "../../layouts/formLayout";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import { AuthAPI } from "./api";
import { LoginFormFields } from "./fields";
import template from "./loginPage.hbs?raw";
import "./style.scss";
import { loginValidator, passwordValidator } from "./validators";

type LoginFormData = {
  login: string;
  password: string;
};

class LoginForm extends Form<LoginFormData> {
  api = new AuthAPI();
  constructor() {
    const fields = new LoginFormFields();

    const actions = [
      new Button({
        text: "Войти",
        type: "submit",
        className: "primary login-form__button",
      }),
      new Link({
        href: "/signup",
        content: "Нет аккаунта? Регистрация",
        className: "login-form__link",
      }),
    ];

    const formContent = new UserForm({
      fields,
      actions,
    });

    super({
      formContent,
      onSubmit: (values: LoginFormData) => {
        this.handleSubmit(values);
      },
    });

    this.addValidators({
      login: (value: string) => loginValidator(value),
      password: (value: string) => passwordValidator(value),
    });

    fields.setValidator(this.formValidator);
  }

  handleSubmit(values: LoginFormData) {
    this.api.login(values);
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
      true,
    );
  }
}

export class LoginPageLayout extends MainLayout {
  constructor() {
    super({
      content: new LoginPage(),
    });
  }
}
