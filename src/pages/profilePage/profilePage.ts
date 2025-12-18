import Handlebars from "handlebars";

import ProfilePageTemplate from "./profilePage.hbs?raw";
import "./style.scss";

type UserProfile = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

const mockUserProfile: UserProfile = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  first_name: "Иван",
  second_name: "Иванов",
  display_name: "Иван",
  phone: "+7 (909) 967 30 30",
};

type UserProfileFields = keyof UserProfile;

const fields: Record<UserProfileFields, string> = {
  email: "Почта",
  login: "Логин",
  first_name: "Имя",
  second_name: "Фамилия",
  display_name: "Имя в чате",
  phone: "Телефон",
};

const mapProfileToTemplateData = (profile: UserProfile) => {
  return Object.entries(profile).map(([key, value]) => ({
    label: fields[key as UserProfileFields],
    value,
  }));
};

export const renderProfilePage = (): string => {
  const template = Handlebars.compile(ProfilePageTemplate);
  const mappedData = mapProfileToTemplateData(mockUserProfile);
  return template({ userFields: mappedData, user: mockUserProfile });
};
