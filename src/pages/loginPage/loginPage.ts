import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { Link } from "../../components/link";
import { UserForm } from "../../components/userForm/userForm";
import { FormField } from "../../components/userForm/userFormField";
import { Input } from "../../components/userForm/userFormInput";
import { FormLayoutBlock } from "../../layouts/formLayout";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import template from "./loginPage.hbs?raw";

import "./style.scss";

const fields = [
  {
    label: "Логин",
    id: "login",
    errorMessage: "Неверный логин",
    type: "text",
    name: "login",
    placeholder: "Введите логин",
  },
  {
    label: "Пароль",
    id: "password",
    errorMessage: "Неверный пароль",
    type: "password",
    name: "password",
    placeholder: "Введите пароль",
  },
];

class LoginPage extends Block {
  constructor() {
    super(
      template,
      {
        formLayout: new FormLayoutBlock({
          title: "Вход",
          form: new Form({
            formContent: new UserForm({
              formFields: fields.map(
                (field) =>
                  new FormField({
                    label: field.label,
                    id: field.id,
                    errorMessage: field.errorMessage,
                    input: new Input({
                      type: field.type,
                      name: field.name,
                      placeholder: field.placeholder,
                      id: field.id,
                    }),
                  })
              ),
              actions: [
                new Button({
                  text: "Войти",
                  type: "submit",
                  className: "primary login-form__button",
                }),
                new Link(
                  "/signup",
                  "Нет аккаунта? Регистрация",
                  "login-form__link"
                ),
              ],
            }),
          }),
        }),
      },
      true
    );
  }
}

export const loginPage = new MainLayout({
  content: new LoginPage(),
});
