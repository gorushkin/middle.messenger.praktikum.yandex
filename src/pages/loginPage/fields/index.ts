import { UserFormFields } from "../../../components/userForm/userFormFields";

import { login, password } from "./fields";
import fieldsTemplate from "./fields.hbs?raw";

export class LoginFormFields extends UserFormFields {
  constructor() {
    super(fieldsTemplate, {
      login,
      password,
    });
  }
}
