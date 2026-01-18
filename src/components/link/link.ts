import { Block } from "../../libs/block";

import LinkTemplate from "./link.hbs?raw";

import "./style.scss";

type LinkProps = {
  href?: string;
  content?: string;
  className?: string;
};

export class Link extends Block {
  constructor(props: LinkProps = {}) {
    const { href = "#", content = "Link", className = "" } = props;
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
