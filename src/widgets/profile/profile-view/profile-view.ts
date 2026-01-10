import { Link } from "../../../components/link";
import { ProfileAvatar } from "../../../components/profileAvatar";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./profile-view.hbs?raw";

import "./style.scss";
import "../style.scss";

export class ProfileView extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithAvatar = {
      ...propsAndChildren,
      profileAvatar: new ProfileAvatar(),
      actions: [
        new Link("/profile-edit-data", "Изменить данные", "profile__link-edit"),
        new Link(
          "/profile-edit-password",
          "Изменить пароль",
          "profile__link-edit"
        ),
        new Link("/login", "Выйти", "profile__link-edit"),
      ],
    };
    super(template, propsWithAvatar, true);
  }
}
