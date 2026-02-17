import { ProfileInput } from "../../../components/profile-input";
import { ProfileAvatar } from "../../../components/profileAvatar";
import type { UserProfile } from "../../../entities/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { mapProfileToTemplateData } from "../../../libs/mapProfileToTemplateData";

import template from "./profile-edit-data.hbs?raw";
import "./style.scss";

type ProfileViewEditDataProps = {
  user?: UserProfile;
};

export class ProfileViewEditData extends Block<ProfileViewEditDataProps> {
  constructor(propsAndChildren: PropsAndChildren<ProfileViewEditDataProps>) {
    const userFields = propsAndChildren.user
      ? mapProfileToTemplateData(propsAndChildren.user).map(
          (field) =>
            new ProfileInput({
              ...field,
              isEditing: true,
            }),
        )
      : [];

    const propsWithAvatar = {
      ...propsAndChildren,
      profileAvatar: new ProfileAvatar({ isEditable: true }),
      userFields,
    };
    super(template, propsWithAvatar, true);
  }

  private getUserFields(user: UserProfile | null) {
    const userFields = user
      ? mapProfileToTemplateData(user).map(
          (field) =>
            new ProfileInput({
              ...field,
              isEditing: true,
            }),
        )
      : [];

    return userFields;
  }

  componentDidUpdate(
    oldProps: PropsAndChildren<ProfileViewEditDataProps>,
    newProps: PropsAndChildren<ProfileViewEditDataProps>,
  ): boolean {
    const itemsChanged = oldProps.user !== newProps.user;

    if (itemsChanged && newProps.user) {
      const userFields = this.getUserFields(newProps.user);

      this.children.userFields = userFields;
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
