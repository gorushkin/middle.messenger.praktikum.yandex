import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./button.hbs?raw";
import "./style.scss";

export type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  events?: Record<string, EventListener>;
};

export class Button extends Block<ButtonProps> {
  constructor(propsAndChildren: PropsAndChildren<ButtonProps>) {
    super(template, propsAndChildren, true);
  }
}
