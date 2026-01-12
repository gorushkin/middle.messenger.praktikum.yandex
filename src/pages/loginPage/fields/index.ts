import type { FormValidator } from "../../../components/form";
import { Block } from "../../../libs/block";

import { login, password } from "./fields";

const fieldsTemplate = `
  <div>
  {{{login}}}
  {{{password}}}
  </div>
`;

export class LoginFormFields extends Block {
  constructor() {
    super(
      fieldsTemplate,
      {
        login,
        password,
      },
      true
    );
  }

  setValidator(validator: FormValidator) {
    login.setValidator(validator);
    password.setValidator(validator);
  }
}
