import { Block } from "../../libs/block";

import LinkTemplate from "./textSPALink.hbs?raw";

import "./style.scss";

export class TextSPALink extends Block {
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
