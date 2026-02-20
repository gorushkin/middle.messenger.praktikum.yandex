import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./image.hbs?raw";

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
