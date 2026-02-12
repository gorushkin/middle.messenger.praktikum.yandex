import { authApi } from "../../../api";
import { Button } from "../../../components/button";
import { Link } from "../../../components/link";
import { ProfileInput } from "../../../components/profile-input";
import { ProfileAvatar } from "../../../components/profileAvatar";
import type { UserProfile } from "../../../entities/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { mapProfileToTemplateData } from "../../../libs/mapProfileToTemplateData";
import { store, STORE_EVENTS } from "../../../libs/store";

import template from "./profile-view.hbs?raw";

import "./style.scss";
import "../style.scss";

export class ProfileView extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(
      template,
      {
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
          new Button({
            text: "Выйти",
            variant: "link",
            className: "profile__link-edit",
            type: "button",
            events: {
              click: () => {
                authApi.logout();
              },
            },
          }),
        ],
      },
      true,
    );

    store.on(STORE_EVENTS.UPDATED, () => {
      const user = store.get<UserProfile>("user", null);

      this.setProps({ user });
    });
  }

  private getUserFields(user: UserProfile | null) {
    const userFields = user
      ? mapProfileToTemplateData(user).map((field) => {
          return new ProfileInput({
            ...field,
            isEditing: false,
          });
        })
      : [];

    return userFields;
  }

  componentDidUpdate(
    oldProps: PropsAndChildren,
    newProps: PropsAndChildren,
  ): boolean {
    const itemsChanged = oldProps.user !== newProps.user;

    if (itemsChanged && newProps.user) {
      this.children.userFields = this.getUserFields(
        newProps.user as UserProfile,
      );
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
