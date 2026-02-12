import { userApi, type UpdateUserPasswordRequest } from "../../api";
import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { MainLayout } from "../../layouts/mainLayout";
import { ProfileLayout } from "../../layouts/profileLayout";
import { Block } from "../../libs/block";
import { ProfileViewEditPassword } from "../../widgets/profile/profile-edit-password";

import template from "./profileEditPassword.hbs?raw";

class ProfileEditPasswordFormContent extends Block {
  constructor(formId: string) {
    super(template, {
      profileContent: new ProfileViewEditPassword({
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

// TODO: refactor duplicate code with ProfileEditDataForm
// TODO: add validations
class ProfileEditPasswordForm extends Form<UpdateUserPasswordRequest> {
  constructor() {
    const id = crypto.randomUUID();
    const formContent = new ProfileEditPasswordFormContent(id);

    const onSubmit = async (values: UpdateUserPasswordRequest) => {
      await userApi.updatePassword(values);
    };

    super({
      formContent,
      onSubmit,
      id,
      className: "profile__content",
    });
  }
}

export class ProfileEditPasswordPageLayout extends MainLayout {
  constructor() {
    super({
      content: new ProfileLayout({
        profileContent: new ProfileEditPasswordForm(),
        className: "profile__content-edit",
      }),
    });
  }
}
