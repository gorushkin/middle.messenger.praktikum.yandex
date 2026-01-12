import { LoginInput } from "../../../components/userForm/userFormInput";

export const login = new LoginInput({
  label: "Логин",
  id: "login",
  errorMessage: "",
  name: "login",
  type: "text",
  placeholder: "Введите логин",
});

export const password = new LoginInput({
  label: "Пароль",
  id: "password",
  errorMessage: "",
  name: "password",
  type: "password",
  placeholder: "Введите пароль",
});
