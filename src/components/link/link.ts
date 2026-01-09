import { Block } from "../../libs/block";

import LinkTemplate from "./link.hbs?raw";

import "./style.scss";

export class Link extends Block {
  constructor(href = "#", content = "Link", className = "") {
    super(
      LinkTemplate,
      {
        href,
        content,
        className,
      },
      true
    );
  }
}
