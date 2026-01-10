import { ProfileAvatar } from "../../../components/profileAvatar";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./profile-edit-data.hbs?raw";
import "./style.scss";

export class ProfileViewEditData extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithAvatar = {
      ...propsAndChildren,
      profileAvatar: new ProfileAvatar(),
    };
    super(template, propsWithAvatar, true);
  }
}
