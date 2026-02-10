import { Block, InputBlock } from "../../libs/block";

import template from "./form.hbs?raw";
import { FormValidator, type Validator } from "./fromValidator";

export class Form<
  T extends Record<string, string> = { [key: string]: string },
> extends Block {
  formValidator: FormValidator = new FormValidator();
  constructor(params: {
    formContent: Block;
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (values: T) => void | Promise<void>;
    id?: string;
    className?: string;
  }) {
    const { formContent, onSubmit, id, className } = params;

    super(
      template,
      {
        formContent,
        events: {
          submit: async (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const values = this.getFormData(form);
            this.formValidator.setValues(values);
            this.onSubmit();
            if (onSubmit) {
              await onSubmit(values);
            }
          },
        },
        id,
        className,
      },
      true,
    );
  }

  getFormData = (form: HTMLFormElement): T => {
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    return data as T;
  };

  onSubmit() {
    const errors = this.formValidator.getErrors();
    Object.keys(errors).forEach((key) => {
      const formContent = this.children.formContent as Block;
      const fields = formContent.children.fields as Block;
      const inputField = fields.children[key] as InputBlock;

      const value = this.formValidator.values[key] || "";
      inputField.validate(value);
    });
  }

  addValidators(validators: { [key: string]: Validator }) {
    this.formValidator.addValidators(validators);
  }
}
