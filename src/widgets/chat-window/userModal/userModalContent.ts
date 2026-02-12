import { Button } from "../../../components/button";
import { Form } from "../../../components/form";
import type { Validator } from "../../../components/form/fromValidator";
import { UserForm } from "../../../components/userForm/userForm";
import { UserFormFields } from "../../../components/userForm/userFormFields";
import { UserFormInput } from "../../../components/userForm/userFormInput";

import "./style.scss";

type UserModalData = {
  login: string;
};

type UserModalContentProps = {
  title: string;
  placeholder: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  // eslint-disable-next-line no-unused-vars
  onSubmit: (login: string) => void;
  validator?: Validator;
};

class UserModalFields extends UserFormFields {
  constructor(placeholder: string) {
    const login = new UserFormInput({
      name: "login",
      type: "text",
      placeholder,
      className: "user-modal__input",
    });

    super("<div>{{{login}}}</div>", {
      login,
    });
  }
}

export class UserModalContent extends Form<UserModalData> {
  constructor(props: UserModalContentProps) {
    const {
      placeholder,
      buttonText,
      buttonVariant = "primary",
      onSubmit,
      validator,
    } = props;

    const fields = new UserModalFields(placeholder);

    const actions = [
      new Button({
        text: buttonText,
        type: "submit",
        variant: buttonVariant,
        className: "user-modal__button",
      }),
    ];

    const formContent = new UserForm({
      fields,
      actions,
    });

    super({
      formContent,
      onSubmit: (values: UserModalData) => {
        onSubmit(values.login);
      },
      className: "user-modal",
    });

    if (validator) {
      this.addValidators({
        login: validator,
      });
    }

    fields.setValidator(this.formValidator);
  }
}
