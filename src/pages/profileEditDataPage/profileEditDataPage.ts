import Handlebars from "handlebars";

import { mockUserProfile } from "../../entities/user";
import { mapProfileToTemplateData } from "../../libs/mapProfileToTemplateData";

import ProfileEditDataPageTemplate from "./profileEditDataPage.hbs?raw";

import "./style.scss";

export const renderProfileEditDataPage = (): string => {
  const template = Handlebars.compile(ProfileEditDataPageTemplate);
  const mappedData = mapProfileToTemplateData(mockUserProfile);
  return template({ userFields: mappedData, user: mockUserProfile });
};
