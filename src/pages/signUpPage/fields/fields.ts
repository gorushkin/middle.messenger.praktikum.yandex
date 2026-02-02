import { UserFormInput } from "../../../components/userForm/userFormInput";

const email = new UserFormInput({
  label: "Почта",
  id: "email",
  errorMessage: "",
  name: "email",
  type: "email",
  placeholder: "Введите почту",
});

const login = new UserFormInput({
  label: "Логин",
  id: "login",
  errorMessage: "",
  name: "login",
  type: "text",
  placeholder: "Введите логин",
});

const first_name = new UserFormInput({
  label: "Имя",
  id: "first_name",
  errorMessage: "",
  name: "first_name",
  type: "text",
  placeholder: "Введите имя",
});

const second_name = new UserFormInput({
  label: "Фамилия",
  id: "second_name",
  errorMessage: "",
  name: "second_name",
  type: "text",
  placeholder: "Введите фамилию",
});

const phone = new UserFormInput({
  label: "Телефон",
  id: "phone",
  errorMessage: "",
  name: "phone",
  type: "tel",
  placeholder: "Введите телефон",
});

const password = new UserFormInput({
  label: "Пароль",
  id: "password",
  errorMessage: "",
  name: "password",
  type: "password",
  placeholder: "Введите пароль",
});

const password_confirm = new UserFormInput({
  label: "Пароль (ещё раз)",
  id: "password_confirm",
  errorMessage: "",
  name: "password_confirm",
  type: "password",
  placeholder: "Введите пароль",
});

export {
  email,
  login,
  first_name,
  second_name,
  phone,
  password,
  password_confirm,
};
