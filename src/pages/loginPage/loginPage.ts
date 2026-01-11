import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Link } from "../../components/link";
import { UserForm } from "../../components/userForm/userForm";
import { FormLayoutBlock } from "../../layouts/formLayout";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import { LoginInput } from "./fields/loginInput";
import template from "./loginPage.hbs?raw";
import "./style.scss";
import { loginValidator, passwordValidator } from "./validators";

const login = new LoginInput({
  label: "Логин",
  id: "login",
  errorMessage: "",
  name: "login",
  type: "text",
  placeholder: "Введите логин",
});

const password = new LoginInput({
  label: "Пароль",
  id: "password",
  errorMessage: "",
  name: "password",
  type: "password",
  placeholder: "Введите пароль",
});

class LoginForm extends Form {
  constructor() {
    const formContent = new UserForm({
      login,
      password,
      actions: [
        new Button({
          text: "Войти",
          type: "submit",
          className: "primary login-form__button",
        }),
        new Link("/signup", "Нет аккаунта? Регистрация", "login-form__link"),
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
          const field = this.children.formContent as Block;
          const inputField = field.children[key] as LoginInput;

          if (inputField) {
            inputField.setProps({
              errorMessage: result.isValid ? "" : result.error,
              isValid: result.isValid,
            });
          }
        });
      },
    });

    this.formValidator.addValidators({
      login: (value: string) => loginValidator(value),
      password: (value: string) => passwordValidator(value),
    });

    login.setValidator(this.formValidator);
    password.setValidator(this.formValidator);
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
