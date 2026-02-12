import { userApi, type UserProfileUpdateRequest } from "../../api";
import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { MainLayout } from "../../layouts/mainLayout";
import { ProfileLayout } from "../../layouts/profileLayout";
import { Block } from "../../libs/block";
import { ProfileViewEditData } from "../../widgets/profile";

import template from "./profileEditDataPage.hbs?raw";

import "./style.scss";

class ProfileEditDataFormContent extends Block {
  constructor(formId: string) {
    super(template, {
      profileContent: new ProfileViewEditData({
        saveButton: new Button({
          className: "primary profile__button",
          type: "submit",
          text: "Сохранить",
          formId,
        }),
      }),
    });
  }
}

class ProfileEditDataForm extends Form<UserProfileUpdateRequest> {
  constructor() {
    const id = crypto.randomUUID();
    const formContent = new ProfileEditDataFormContent(id);

    const onSubmit = async (values: UserProfileUpdateRequest) => {
      await userApi.updateProfile(values);
    };

    super({
      formContent,
      onSubmit,
      id,
      className: "profile__content",
    });
  }
}

export class ProfileEditDataPageLayout extends MainLayout {
  constructor() {
    super({
      content: new ProfileLayout({
        profileContent: new ProfileEditDataForm(),
        className: "profile__content-edit",
      }),
    });
  }
}
