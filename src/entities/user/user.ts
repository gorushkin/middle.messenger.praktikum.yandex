export type UserProfile = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  email: string;
  phone: string;
};

export type Password = {
  oldPassword: string;
  newPassword: string;
  password: string;
};

export const mockPassword: Password = {
  oldPassword: "old_password",
  newPassword: "new_password",
  password: "password",
};

export type UserProfileFields = keyof Omit<UserProfile, "id" | "avatar">;
export type UserPasswordFields = keyof Password;

export const userDataFields: Record<
  UserProfileFields,
  { name: string; type: string }
> = {
  email: { name: "Почта", type: "email" },
  login: { name: "Логин", type: "text" },
  first_name: { name: "Имя", type: "text" },
  second_name: { name: "Фамилия", type: "text" },
  display_name: { name: "Имя в чате", type: "text" },
  phone: { name: "Телефон", type: "phone" },
};

export const userPasswordFields: Record<
  UserPasswordFields,
  { name: string; type: string }
> = {
  password: { name: "Повторите новый пароль", type: "password" },
  oldPassword: { name: "Старый пароль", type: "password" },
  newPassword: { name: "Новый пароль", type: "password" },
};
