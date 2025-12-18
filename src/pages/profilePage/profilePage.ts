import Handlebars from "handlebars";

import { mockUserProfile } from "../../entities/user";
import { mapProfileToTemplateData } from "../../libs/mapProfileToTemplateData";

import ProfilePageTemplate from "./profilePage.hbs?raw";

export const renderProfilePage = (): string => {
  const template = Handlebars.compile(ProfilePageTemplate);
  const mappedData = mapProfileToTemplateData(mockUserProfile);
  return template({ userFields: mappedData, user: mockUserProfile });
};
