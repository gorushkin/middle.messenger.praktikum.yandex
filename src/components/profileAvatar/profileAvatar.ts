import { userApi } from "../../api/userApi";
import { Block } from "../../libs/block";

import template from "./profileAvatar.hbs?raw";

import "./style.scss";

type ProfileAvatarProps = {
  imageUrl?: string;
  isEditable?: boolean;
};

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  private selectedFile: File | null = null;

  constructor(props: ProfileAvatarProps = {}) {
    const { isEditable } = props;
    super(
      template,
      {
        ...props,
        ...(isEditable
          ? {
              events: {
                change: (e: Event) => this.handleFileChange(e),
                click: (e: Event) => this.handleClick(e),
              },
            }
          : {}),
      },
      true,
    );
  }

  private handleClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.closest(".profile__avatar-label")) {
      const input = this._element?.querySelector(
        ".profile__avatar-input",
      ) as HTMLInputElement;

      input?.click();
    }
  }

  private async handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;

      const imageUrl = URL.createObjectURL(file);
      this.setProps({ imageUrl });

      await userApi.updateAvatar(file);
    }
  }
}
