import { UserFormFields } from "../../../components/userForm/userFormFields";

import {
  email,
  login,
  first_name,
  password,
  password_confirm,
  second_name,
  phone,
} from "./fields";
import fieldsTemplate from "./fields.hbs?raw";

export class SignUpFormFields extends UserFormFields {
  constructor() {
    super(fieldsTemplate, {
      email,
      login,
      first_name,
      second_name,
      phone,
      password,
      password_confirm,
    });
  }
}
