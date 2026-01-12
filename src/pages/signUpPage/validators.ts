import type { ValidationResult } from "../../components/form/fromValidator";

export const loginValidator = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: "Логин обязателен" };
  }

  if (value.length < 3 || value.length > 20) {
    return { isValid: false, error: "Логин должен быть от 3 до 20 символов" };
  }

  const validCharsRegex = /^[a-zA-Z0-9_-]+$/;
  if (!validCharsRegex.test(value)) {
    return {
      isValid: false,
      error:
        "Логин может содержать только латинские буквы, цифры, дефис и подчёркивание",
    };
  }

  const hasLetterRegex = /[a-zA-Z]/;
  if (!hasLetterRegex.test(value)) {
    return {
      isValid: false,
      error: "Логин должен содержать хотя бы одну букву",
    };
  }

  return { isValid: true };
};

export const passwordValidator = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: "Пароль обязателен" };
  }

  if (value.length < 8 || value.length > 40) {
    return { isValid: false, error: "Пароль должен быть от 8 до 40 символов" };
  }

  const hasUpperCaseRegex = /[A-Z]/;
  if (!hasUpperCaseRegex.test(value)) {
    return {
      isValid: false,
      error: "Пароль должен содержать хотя бы одну заглавную букву",
    };
  }

  const hasDigitRegex = /\d/;
  if (!hasDigitRegex.test(value)) {
    return {
      isValid: false,
      error: "Пароль должен содержать хотя бы одну цифру",
    };
  }

  return { isValid: true };
};

export const firstNameValidator = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: "Имя обязательно" };
  }

  const validNameRegex = /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/;
  if (!validNameRegex.test(value)) {
    return {
      isValid: false,
      error:
        "Имя должно начинаться с заглавной буквы, содержать только латиницу или кириллицу, допустим дефис",
    };
  }

  return { isValid: true };
};

export const secondNameValidator = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: "Фамилия обязательна" };
  }

  const validNameRegex = /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/;
  if (!validNameRegex.test(value)) {
    return {
      isValid: false,
      error:
        "Фамилия должна начинаться с заглавной буквы, содержать только латиницу или кириллицу, допустим дефис",
    };
  }

  return { isValid: true };
};

export const emailValidator = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: "Email обязателен" };
  }

  const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(value)) {
    return {
      isValid: false,
      error: "Email должен быть в формате example@domain.com",
    };
  }

  return { isValid: true };
};

export const phoneValidator = (value: string): ValidationResult => {
  if (!value) {
    return { isValid: false, error: "Телефон обязателен" };
  }

  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(value)) {
    return {
      isValid: false,
      error: "Телефон должен содержать от 10 до 15 цифр, может начинаться с +",
    };
  }

  return { isValid: true };
};
