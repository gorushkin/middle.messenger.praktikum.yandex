// eslint-disable-next-line no-unused-vars
export type Validator = (value: string) => ValidationResult;

export type ValidationResult =
  | { isValid: true }
  | { isValid: false; error: string };

export class FormValidator {
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

  addValidators(validators: { [key: string]: Validator }) {
    for (const key in validators) {
      this.addValidator(key, validators[key]);
    }
  }

  // validateValues(values: { [key: string]: string }): boolean {
  //   this.values = values;
  //   for (const key of this.keys) {
  //     if (!values[key] || values[key].trim().length === 0) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  validateField(key: string, value: string): ValidationResult {
    const validator = this.validators[key];

    if (validator) {
      return validator(value);
    }

    return { isValid: true };
  }

  getErrors(): { [key: string]: ValidationResult } {
    const errors: { [key: string]: ValidationResult } = {};

    for (const key of this.keys) {
      const value = this.values[key];

      const result = this.validateField(key, value);

      if (!result.isValid) {
        errors[key] = result;
      }
    }

    return errors;
  }

  setValues(values: { [key: string]: string }) {
    this.values = values;
  }

  isFormValid(): boolean {
    const errors = this.getErrors();
    return Object.keys(errors).length === 0;
  }
}
