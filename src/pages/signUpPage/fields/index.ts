import type { FormValidator } from "../../../components/form";
import { Block } from "../../../libs/block";

import {
  email,
  login,
  name,
  password,
  passwordConfirm,
  surname,
  phone,
} from "./fields";

const fieldsTemplate = `
  <div>
  {{{email}}}
  {{{login}}}
  {{{name}}}
  {{{surname}}}
  {{{phone}}}
  {{{password}}}
  {{{passwordConfirm}}}
  </div>
`;

export class SignUpFormFields extends Block {
  constructor() {
    super(
      fieldsTemplate,
      {
        email,
        login,
        name,
        surname,
        phone,
        password,
        passwordConfirm,
      },
      true
    );
  }

  setValidator(validator: FormValidator) {
    login.setValidator(validator);
    password.setValidator(validator);
    email.setValidator(validator);
    name.setValidator(validator);
    surname.setValidator(validator);
    phone.setValidator(validator);
    passwordConfirm.setValidator(validator);
  }
}
