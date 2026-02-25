/* eslint-disable no-unused-vars */
import { Block } from "../../libs/block/index.ts";
import { ImageWithDefault } from "../image/image.ts";
import { Image } from "../image/index.ts";

import template from "./imageUploader.hbs?raw";

import "./style.scss";

export type ImageUploaderProps = {
  imageUrl?: string;
  isEditable?: boolean;
  onSave?: (file: File) => Promise<void>;
};

export class ImageUploader extends Block<ImageUploaderProps> {
  private currentImageComponent: Image;

  private onSave?: (file: File) => Promise<void>;

  constructor(props: ImageUploaderProps = {}) {
    const { isEditable, imageUrl, onSave } = props;

    const currentImage = new ImageWithDefault({
      src: imageUrl,
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
    this.onSave = onSave;
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

      if (this.onSave) {
        await this.onSave(file);
      }
    }
  }
}
