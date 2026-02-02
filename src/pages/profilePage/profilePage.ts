import { Button } from "../../components/button";
import { ProfileInput } from "../../components/profile-input";
import { mockUserProfile } from "../../entities/user";
import { MainLayout } from "../../layouts/mainLayout";
import { ProfileLayout } from "../../layouts/profileLayout";
import { Block } from "../../libs/block";
import { mapProfileToTemplateData } from "../../libs/mapProfileToTemplateData";
import { ProfileView } from "../../widgets/profile/profile-view";

import template from "./profilePage.hbs?raw";

class ProfileEditDataPage extends Block {
  constructor() {
    const mappedData = mapProfileToTemplateData(mockUserProfile).map(
      (field) =>
        new ProfileInput({
          ...field,
          isEditing: true,
        })
    );

    super(template, {
      profileContent: new ProfileView({
        user: mockUserProfile,
        userFields: mappedData,
        saveButton: new Button({
          className: "primary profile__button",
          type: "submit",
          text: "Сохранить",
        }),
      }),
    });
  }
}

export const profilePage = new MainLayout({
  content: new ProfileLayout({
    profileContent: new ProfileEditDataPage(),
  }),
});
