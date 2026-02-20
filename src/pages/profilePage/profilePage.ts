import { Button } from "../../components/button";
import { MainLayout } from "../../layouts/mainLayout";
import { ProfileLayout } from "../../layouts/profileLayout";
import { Block } from "../../libs/block";
import { withUser } from "../../libs/connect";
import { ProfileView } from "../../widgets/profile/profile-view";

import template from "./profilePage.hbs?raw";

class ProfilePageContent extends Block {
  constructor() {
    super(template, {
      profileContent: new (withUser(ProfileView))({
        saveButton: new Button({
          className: "primary profile__button",
          type: "submit",
          text: "Сохранить",
        }),
      }),
    });
  }
}

export class ProfilePageLayout extends MainLayout {
  constructor() {
    super({
      content: new ProfileLayout({
        profileContent: new ProfilePageContent(),
      }),
    });
  }
}
