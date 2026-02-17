import { ProfileInput } from "../../../components/profile-input";
import { ProfileAvatar } from "../../../components/profileAvatar";
import { mockPassword } from "../../../entities/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { mapPasswordToTemplateData } from "../../../libs/mapProfileToTemplateData";

import template from "./profile-edit-password.hbs?raw";

import "./style.scss";

export class ProfileViewEditPassword extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const fields = mapPasswordToTemplateData(mockPassword).map(
      (field) =>
        new ProfileInput({
          ...field,
          isEditing: true,
        }),
    );

    super(
      template,
      {
        ...propsAndChildren,
        fields,
        profileAvatar: new ProfileAvatar(),
      },
      true,
    );
  }
}
