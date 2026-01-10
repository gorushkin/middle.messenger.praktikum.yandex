import { Button } from "../../components/button";
import { ProfileInput } from "../../components/profile-input";
import { mockUserProfile } from "../../entities/user";
import { MainLayout } from "../../layouts/mainLayout";
import { ProfileLayout } from "../../layouts/profileLayout";
import { Block } from "../../libs/block";
import { mapProfileToTemplateData } from "../../libs/mapProfileToTemplateData";
import { ProfileViewEditData } from "../../widgets/profile";

import template from "./profileEditDataPage.hbs?raw";

import "./style.scss";

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
      profileContent: new ProfileViewEditData({
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

export const profileEditDataPage = new MainLayout({
  content: new ProfileLayout({
    profileContent: new ProfileEditDataPage(),
    className: "profile__content-edit",
  }),
});
