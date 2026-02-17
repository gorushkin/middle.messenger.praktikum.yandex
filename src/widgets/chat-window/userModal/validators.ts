import type { ValidationResult } from "../../../components/form/fromValidator";

export const loginValidator = (value: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: "Логин не может быть пустым" };
  }

  if (value.length < 3) {
    return {
      isValid: false,
      error: "Логин должен содержать минимум 3 символа",
    };
  }

  if (value.length > 20) {
    return {
      isValid: false,
      error: "Логин должен содержать максимум 20 символов",
    };
  }

  const loginRegex = /^[a-zA-Z0-9_-]+$/;
  if (!loginRegex.test(value)) {
    return {
      isValid: false,
      error:
        "Логин может содержать только латинские буквы, цифры, дефис и подчёркивание",
    };
  }

  return { isValid: true };
};
