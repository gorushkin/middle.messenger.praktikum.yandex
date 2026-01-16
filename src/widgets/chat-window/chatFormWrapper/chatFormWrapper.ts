import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chatFormWrapper.hbs?raw";

export class ChatFormWrapper extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren);
  }
}
