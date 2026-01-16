import type { FormValidator } from "../../../components/form";
import { Input } from "../../../components/input";
import { UserFormField } from "../../../components/userForm/userFormField";
import type { PropsAndChildren } from "../../../libs/block";
import "./style.scss";

export class UserFormInput extends UserFormField {
  formValidator: FormValidator | null = null;

  name = "";
  constructor(propsAndChildren?: PropsAndChildren) {
    const input = new Input(
      {
        type: propsAndChildren?.type || "text",
        name: propsAndChildren?.name || "",
        placeholder: propsAndChildren?.placeholder || "",
        id: propsAndChildren?.id || "",
        className: "input",
      },
      {
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          this.validate(target.value);
        },
      }
    );

    super({ input, ...propsAndChildren });

    this.name = String(propsAndChildren?.name || "");
  }

  setValidator(validator: FormValidator) {
    this.formValidator = validator;
  }

  validate(value: string): void {
    if (!this.formValidator || !this?.name) {
      return;
    }

    const result = this.formValidator.validateField(String(this.name), value);

    this.setProps({
      errorMessage: result.isValid ? "" : result.error,
      isValid: result.isValid,
    });
  }
}
