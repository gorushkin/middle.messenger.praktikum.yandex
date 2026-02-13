import { authApi } from "../../api";
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
import { stringValidator } from "./validators";

type LoginFormData = {
  login: string;
  password: string;
};

class LoginForm extends Form<LoginFormData> {
  api = authApi;
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
      login: (value: string) => stringValidator(value),
      password: (value: string) => stringValidator(value),
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
