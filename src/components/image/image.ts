import { getFullUrl } from "../../config/config";
import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./image.hbs?raw";

const DEFAULT_IMAGE_URL = "/profile_default.svg";

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export class Image extends Block<ImageProps> {
  constructor(propsAndChildren: PropsAndChildren<ImageProps>) {
    super(template, propsAndChildren, true);
  }
}

export class ImageWithDefault extends Block<ImageProps> {
  constructor(propsAndChildren: PropsAndChildren<ImageProps>) {
    const { alt, className } = propsAndChildren;

    const imageUrl = propsAndChildren.src
      ? getFullUrl("/resources" + propsAndChildren.src)
      : DEFAULT_IMAGE_URL;

    super(
      template,
      {
        src: imageUrl,
        alt,
        className,
      },
      true,
    );
  }
}
