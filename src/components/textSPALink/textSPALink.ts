import { Block } from "../../libs/block";

import LinkTemplate from "./textSPALink.hbs?raw";

import "./style.scss";

export class TextSPALink extends Block {
  constructor(href = "#", text = "Link", className = "") {
    super(
      {
        href,
        text,
        className,
      },
      true,
      LinkTemplate
    );
  }
}
