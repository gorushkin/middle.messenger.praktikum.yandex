import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./form.hbs?raw";

// eslint-disable-next-line no-unused-vars
type Validator = (value: string) => boolean;

class FormValidator {
  keys: string[] = [];

  values: { [key: string]: string } = {};

  validators: { [key: string]: Validator } = {};

  addKey(key: string) {
    this.keys.push(key);
  }

  addValidator(key: string, validator: Validator) {
    this.addKey(key);
    this.validators[key] = validator;
  }

  validateValues(values: { [key: string]: string }): boolean {
    this.values = values;
    for (const key of this.keys) {
      if (!values[key] || values[key].trim().length === 0) {
        return false;
      }
    }
    return true;
  }

  validateField(key: string, value: string): boolean {
    const validator = this.validators[key];

    if (validator) {
      return validator(value);
    }

    return true;
  }

  getErrors(): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    for (const key of this.keys) {
      const value = this.values[key];
      const validator = this.validators[key];

      if (validator && !validator(value)) {
        errors[key] = `Invalid value for ${key}`;
      }
    }

    return errors;
  }

  setValues(values: { [key: string]: string }) {
    this.values = values;
  }
}

export class Form extends Block {
  formValidator: FormValidator = new FormValidator();
  constructor(params: {
    onSubmit?: () => void;
    propsAndChildren?: PropsAndChildren;
  }) {
    const { onSubmit, propsAndChildren } = params;

    const formPropsWithEvents = {
      ...propsAndChildren,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const values = this.getFormData(form);
          this.formValidator.setValues(values);
          onSubmit?.();
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
}
