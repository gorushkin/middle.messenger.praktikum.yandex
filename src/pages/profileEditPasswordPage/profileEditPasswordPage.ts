import Handlebars from "handlebars";

import { mockPassword } from "../../entities/user";
import { mapPasswordToTemplateData } from "../../libs/mapProfileToTemplateData";

import ProfileEditPasswordTemplate from "./profileEditPassword.hbs?raw";

export const renderProfileEditPasswordPage = (): string => {
  const template = Handlebars.compile(ProfileEditPasswordTemplate);
  const mappedData = mapPasswordToTemplateData(mockPassword);
  return template({ fields: mappedData, password: mockPassword });
};
