import { UserFormInput } from "../../../components/userForm/userFormInput";

export const login = new UserFormInput({
  label: "Логин",
  id: "login",
  errorMessage: "",
  name: "login",
  type: "text",
  placeholder: "Введите логин",
});

export const password = new UserFormInput({
  label: "Пароль",
  id: "password",
  errorMessage: "",
  name: "password",
  type: "password",
  placeholder: "Введите пароль",
});
