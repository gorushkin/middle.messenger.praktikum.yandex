import { Button } from "../../components/button";
import { FormBlock } from "../../components/form/form";
import { FormField } from "../../components/form/formField";
import { Input } from "../../components/form/input";
import { TextSPALink } from "../../components/textSPALink/textSPALink";
import { FormLayoutBlock } from "../../layouts/formLayout";
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
                text: "Войти",
                type: "submit",
                className: "primary login-form__button",
              }),
              new TextSPALink(
                "/signup",
                "Нет аккаунта? Регистрация",
                "login-form__link"
              ),
            ],
          }),
        }),
      },
      true
    );
  }
}

export const loginPage = new LoginPage();
