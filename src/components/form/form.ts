import { Block, InputBlock } from "../../libs/block";
import type { FormsWithValidatorsAndFields } from "../userForm/userForm/userForm";

import template from "./form.hbs?raw";
import { FormValidator, type Validator } from "./fromValidator";

export class Form extends Block {
  formValidator: FormValidator = new FormValidator();
  constructor(params: { formContent: FormsWithValidatorsAndFields }) {
    const { formContent } = params;

    const formPropsWithEvents = {
      formContent,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const values = this.getFormData(form);
          this.formValidator.setValues(values);
          this.onSubmit();
          console.info(values);
        },
      },
    };
    super(template, formPropsWithEvents, true);
  }

  getFormData = (form: HTMLFormElement): { [key: string]: string } => {
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    return data;
  };

  onSubmit() {
    const errors = this.formValidator.getErrors();
    Object.keys(errors).forEach((key) => {
      const result = errors[key];
      const formContent = this.children.formContent as Block;
      const fields = formContent.children.fields as Block;
      const inputField = fields.children[key] as InputBlock;
      console.log("inputField: ", inputField);

      const value = this.formValidator.values[key] || "";
      console.log("value: ", value);
      inputField.validate(value);

      if (inputField) {
        // inputField.setProps({
        //   errorMessage: result.isValid ? "" : result.error,
        //   isValid: result.isValid,
        // });
      }
    });
  }

  addValidators(validators: { [key: string]: Validator }) {
    this.formValidator.addValidators(validators);
  }
}
