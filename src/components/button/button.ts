import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./button.hbs?raw";
import "./style.scss";

export type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "link";
  className?: string;
  events?: Record<string, EventListener>;
  formId?: string;
};

export class Button extends Block<ButtonProps> {
  constructor(propsAndChildren: PropsAndChildren<ButtonProps>) {
    const { variant = "primary", className = "", ...rest } = propsAndChildren;
    const variantClass = variant ? variant : "primary";
    const combinedClassName = `${variantClass} ${className}`.trim();

    super(template, { ...rest, className: combinedClassName }, true);
  }
}
