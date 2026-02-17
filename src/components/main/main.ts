import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./main.hbs?raw";

export type MainProps = {
  content?: string | Block | Block[];
  className?: string;
  events?: Record<string, EventListener>;
};

export class Main extends Block<MainProps> {
  constructor(propsAndChildren: PropsAndChildren<MainProps>) {
    const { className = "", ...rest } = propsAndChildren;

    super(template, { className, ...rest }, true);
  }
}
