import { Button } from "../../components/button";
import { ProfileInput } from "../../components/profile-input";
import { mockPassword } from "../../entities/user";
import { MainLayout } from "../../layouts/mainLayout";
import { ProfileLayout } from "../../layouts/profileLayout";
import { Block } from "../../libs/block";
import { mapPasswordToTemplateData } from "../../libs/mapProfileToTemplateData";
import { ProfileViewEditPassword } from "../../widgets/profile/profile-edit-password";

import template from "./profileEditPassword.hbs?raw";

class ProfileEditPasswordPage extends Block {
  constructor() {
    const mappedData = mapPasswordToTemplateData(mockPassword).map(
      (field) =>
        new ProfileInput({
          ...field,
          isEditing: true,
        })
    );

    super(template, {
      profileContent: new ProfileViewEditPassword({
        password: mockPassword,
        fields: mappedData,
        saveButton: new Button({
          className: "primary profile__button",
          type: "submit",
          text: "Сохранить",
        }),
      }),
    });
  }
}

export const profileEditPasswordPage = new MainLayout({
  content: new ProfileLayout({
    profileContent: new ProfileEditPasswordPage(),
    className: "profile__content-edit",
  }),
});
