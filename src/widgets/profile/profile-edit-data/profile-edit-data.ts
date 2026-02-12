import { ProfileInput } from "../../../components/profile-input";
import { ProfileAvatar } from "../../../components/profileAvatar";
import type { UserProfile } from "../../../entities/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { mapProfileToTemplateData } from "../../../libs/mapProfileToTemplateData";

import template from "./profile-edit-data.hbs?raw";
import "./style.scss";

export class ProfileViewEditData extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithAvatar = {
      ...propsAndChildren,
      profileAvatar: new ProfileAvatar({ isEditable: true }),
    };
    super(template, propsWithAvatar, true);
  }

  componentDidUpdate(
    oldProps: PropsAndChildren,
    newProps: PropsAndChildren,
  ): boolean {
    const itemsChanged = oldProps.user !== newProps.user;

    if (itemsChanged && newProps.user) {
      const userFields = mapProfileToTemplateData(
        newProps.user as UserProfile,
      ).map(
        (field) =>
          new ProfileInput({
            ...field,
            isEditing: true,
          }),
      );

      this.children.userFields = userFields;
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
