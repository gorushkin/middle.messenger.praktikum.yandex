import { Button } from "../../components/button";
import { FormBlock } from "../../components/form/form";
import { FormField } from "../../components/form/formField";
import { Input } from "../../components/form/input";
import { Link } from "../../components/link";
import { FormLayoutBlock } from "../../layouts/formLayout";
import { MainLayout } from "../../layouts/mainLayout";
import { Block } from "../../libs/block";

import template from "./signUpPage.hbs?raw";
import "./style.scss";

const fields = [
  {
    label: "Почта",
    id: "email",
    errorMessage: "Неверная почта",
    type: "email",
    name: "email",
    placeholder: "Введите почту",
  },
  {
    label: "Логин",
    id: "login",
    errorMessage: "Неверный логин",
    type: "text",
    name: "login",
    placeholder: "Введите логин",
  },
  {
    label: "Имя",
    id: "first_name",
    errorMessage: "Неверное имя",
    type: "text",
    name: "first_name",
    placeholder: "Введите имя",
  },
  {
    label: "Фамилия",
    id: "second_name",
    errorMessage: "Неверная фамилия",
    type: "text",
    name: "second_name",
    placeholder: "Введите фамилию",
  },
  {
    label: "Телефон",
    id: "phone",
    errorMessage: "Неверный телефон",
    type: "tel",
    name: "phone",
    placeholder: "Введите телефон",
  },
  {
    label: "Пароль",
    id: "password",
    errorMessage: "Неверный пароль",
    type: "password",
    name: "password",
    placeholder: "Введите пароль",
  },
  {
    label: "Пароль (ещё раз)",
    id: "password_confirm",
    errorMessage: "Пароли не совпадают",
    type: "password",
    name: "password_confirm",
    placeholder: "Введите пароль",
  },
];

class SignUpPage extends Block {
  constructor() {
    super(
      template,
      {
        formLayout: new FormLayoutBlock({
          title: "Регистрация",
          form: new FormBlock({
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
                text: "Зарегистрироваться",
                type: "submit",
                className: "primary login-form__button",
              }),
              new Link("/login", "Войти", "login-form__link"),
            ],
          }),
        }),
      },
      true
    );
  }
}

export const signUpPage = new MainLayout({
  content: new SignUpPage(),
});
