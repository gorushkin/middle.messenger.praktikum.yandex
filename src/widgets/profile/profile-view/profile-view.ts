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
        new Link({
          href: "/profile/edit-data",
          content: "Изменить данные",
          className: "profile__link-edit",
        }),
        new Link({
          href: "/profile/edit-password",
          content: "Изменить пароль",
          className: "profile__link-edit",
        }),
        new Link({
          href: "/login",
          content: "Выйти",
          className: "profile__link-edit",
        }),
      ],
    };
    super(template, propsWithAvatar, true);
  }
}
