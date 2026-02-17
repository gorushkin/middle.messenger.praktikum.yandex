import type { ValidationResult } from "../../components/form/fromValidator";

export const messageValidator = (value: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: "Сообщение не может быть пустым" };
  }

  return { isValid: true };
};
