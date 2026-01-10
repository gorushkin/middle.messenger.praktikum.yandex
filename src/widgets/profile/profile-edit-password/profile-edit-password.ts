import { ProfileAvatar } from "../../../components/profileAvatar";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./profile-edit-password.hbs?raw";

import "./style.scss";

export class ProfileViewEditPassword extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithAvatar = {
      ...propsAndChildren,
      profileAvatar: new ProfileAvatar(),
    };
    super(template, propsWithAvatar, true);
  }
}
