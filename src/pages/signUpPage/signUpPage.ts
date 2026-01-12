import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Link } from "../../components/link";
import { UserForm } from "../../components/userForm/userForm";
import type { LoginInput } from "../../components/userForm/userFormInput";
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

    const formContent = new UserForm({
      fields,
      actions: [
        new Button({
          text: "Зарегистрироваться",
          type: "submit",
          className: "primary login-form__button",
        }),
        new Link("/login", "Войти", "login-form__link"),
      ],
    });

    super({
      propsAndChildren: {
        formContent,
      },
      onSubmit: () => {
        const errors = this.formValidator.getErrors();

        Object.keys(errors).forEach((key) => {
          const result = errors[key];
          const formContent = this.children.formContent as Block;

          const fields = formContent.children.fields as Block;

          const inputField = fields.children[key] as LoginInput;

          if (inputField) {
            inputField.setProps({
              errorMessage: result.isValid ? "" : result.error,
              isValid: result.isValid,
            });
          }
        });
      },
    });

    fields.setValidator(this.formValidator);

    this.formValidator.addValidators({
      login: (value: string) => loginValidator(value),
      password: (value: string) => passwordValidator(value),
      name: (value: string) => firstNameValidator(value),
      surname: (value: string) => secondNameValidator(value),
      email: (value: string) => emailValidator(value),
      phone: (value: string) => phoneValidator(value),
      passwordConfirm: (value: string) => passwordValidator(value),
    });
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
