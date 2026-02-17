import { userApi } from "../../api";
import { getFullUrl } from "../../config/config";
import { Block } from "../../libs/block";
import { Image } from "../image";

import template from "./profileAvatar.hbs?raw";

import "./style.scss";

type ProfileAvatarProps = {
  imageUrl?: string;
  isEditable?: boolean;
  currentImage?: Image | null;
  defaultImage?: Image;
};

const DEFAULT_IMAGE_URL = "/profile_default.svg";

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  private currentImageComponent: Image;

  constructor(props: ProfileAvatarProps = {}) {
    const { isEditable, imageUrl } = props;

    const src = imageUrl
      ? getFullUrl("/resources" + imageUrl)
      : DEFAULT_IMAGE_URL;

    const currentImage = new Image({
      src,
      alt: "Profile Avatar",
      className: "profile__avatar-image",
    });

    super(
      template,
      {
        ...props,
        currentImage,
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

    this.currentImageComponent = currentImage;
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
      const imageUrl = URL.createObjectURL(file);

      this.currentImageComponent.setProps({ src: imageUrl });

      await userApi.updateAvatar(file);
    }
  }
}
