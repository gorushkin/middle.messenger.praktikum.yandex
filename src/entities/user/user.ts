export type UserProfile = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

export type Password = {
  oldPassword: string;
  newPassword: string;
  password: string;
};

export const mockUserProfile: UserProfile = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "Иван",
  phone: "+7 (909) 967 30 30",
};

export const mockPassword: Password = {
  oldPassword: "old_password",
  newPassword: "new_password",
  password: "password",
};

export type UserProfileFields = keyof UserProfile;
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
