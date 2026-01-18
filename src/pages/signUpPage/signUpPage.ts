import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Link } from "../../components/link";
import { UserForm } from "../../components/userForm/userForm";
import { FormLayoutBlock } from "../../layouts/formLayout";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import { SignUpFormFields } from "./fields";
import template from "./signUpPage.hbs?raw";
import "./style.scss";
import {
  emailValidator,
  firstNameValidator,
  loginValidator,
  passwordValidator,
  phoneValidator,
  secondNameValidator,
} from "./validators";

// TODO: refactor duplicate code with LoginPage
class SignUpForm extends Form {
  constructor() {
    const fields = new SignUpFormFields();

    const actions = [
      new Button({
        text: "Зарегистрироваться",
        type: "submit",
        className: "primary login-form__button",
      }),
      new Link({
        href: "/login",
        content: "Войти",
        className: "login-form__link",
      }),
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
      first_name: (value: string) => firstNameValidator(value),
      second_name: (value: string) => secondNameValidator(value),
      email: (value: string) => emailValidator(value),
      phone: (value: string) => phoneValidator(value),
      password_confirm: (value: string) => passwordValidator(value),
    });

    fields.setValidator(this.formValidator);
  }
}

class SignUpPage extends Block {
  constructor() {
    super(
      template,
      {
        formLayout: new FormLayoutBlock({
          title: "Регистрация",
          form: new SignUpForm(),
        }),
      },
      true
    );
  }
}

export const signUpPage = new MainLayout({
  content: new SignUpPage(),
});
