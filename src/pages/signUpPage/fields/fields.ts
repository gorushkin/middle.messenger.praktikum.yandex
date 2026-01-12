import { LoginInput } from "../../../components/userForm/userFormInput";

const email = new LoginInput({
  label: "Почта",
  id: "email",
  errorMessage: "",
  name: "email",
  type: "email",
  placeholder: "Введите почту",
});

const login = new LoginInput({
  label: "Логин",
  id: "login",
  errorMessage: "",
  name: "login",
  type: "text",
  placeholder: "Введите логин",
});

const name = new LoginInput({
  label: "Имя",
  id: "first_name",
  errorMessage: "",
  name: "first_name",
  type: "text",
  placeholder: "Введите имя",
});

const surname = new LoginInput({
  label: "Фамилия",
  id: "second_name",
  errorMessage: "",
  name: "second_name",
  type: "text",
  placeholder: "Введите фамилию",
});

const phone = new LoginInput({
  label: "Телефон",
  id: "phone",
  errorMessage: "",
  name: "phone",
  type: "tel",
  placeholder: "Введите телефон",
});

const password = new LoginInput({
  label: "Пароль",
  id: "password",
  errorMessage: "",
  name: "password",
  type: "password",
  placeholder: "Введите пароль",
});

const passwordConfirm = new LoginInput({
  label: "Пароль (ещё раз)",
  id: "password_confirm",
  errorMessage: "",
  name: "password_confirm",
  type: "password",
  placeholder: "Введите пароль",
});

export { email, login, name, surname, phone, password, passwordConfirm };
