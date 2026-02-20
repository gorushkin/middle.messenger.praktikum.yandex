import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./iconButton.hbs?raw";
import "./style.scss";

export type IconButtonProps = {
  content?: string | Block;
  type?: "button" | "submit" | "reset";
  className?: string;
  events?: Record<string, EventListener>;
};

export class IconButton extends Block<IconButtonProps> {
  constructor(propsAndChildren: PropsAndChildren<IconButtonProps>) {
    const { type = "button", className = "", ...rest } = propsAndChildren;

    super(template, { type, className, ...rest }, true);
  }
}
