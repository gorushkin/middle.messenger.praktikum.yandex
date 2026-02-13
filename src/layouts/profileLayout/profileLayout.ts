import { Link } from "../../components/link";
import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./profileLayout.hbs?raw";
import "./style.scss";

export class ProfileLayout extends Block {
  constructor(propsAndChildren: PropsAndChildren) {
    const propsWithButton = {
      ...propsAndChildren,
      backButton: new Link({
        href: "/chat",
        content: `<div class="profile__back-icon">
        <img src="/back_arrow.svg" alt="Arrow Icon" />
      </div>`,
      }),
    };
    super(template, propsWithButton, true);
  }
}
