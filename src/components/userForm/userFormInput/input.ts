import type { FormValidator } from "../../../components/form";
import { Input } from "../../../components/input";
import { FormField } from "../../../components/userForm/userFormField";
import "./style.scss";

export class LoginInput extends FormField {
  formValidator: FormValidator | null = null;
  constructor(propsAndChildren?: Record<string, unknown>) {
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

          if (!this.formValidator || !propsAndChildren?.name) {
            return;
          }

          const result = this.formValidator.validateField(
            String(propsAndChildren.name),
            target.value
          );

          this.setProps({
            errorMessage: result.isValid ? "" : result.error,
            isValid: result.isValid,
          });
        },
      }
    );

    super({ input, ...propsAndChildren });
  }

  setValidator(validator: FormValidator) {
    this.formValidator = validator;
  }
}
