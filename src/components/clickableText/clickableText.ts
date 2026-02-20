import type { User } from "../../entities/user/user";
import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./clickableText.hbs?raw";

import "./style.scss";

type ClickableTextProps = {
  text: string;
  className?: string;
  selectedUsers: User[];
  id: number;
  isSelected?: boolean;
};

export class ClickableText extends Block<ClickableTextProps> {
  id = -1;
  constructor(propsAndChildren: PropsAndChildren<ClickableTextProps>) {
    super(template, propsAndChildren, true);

    this.id = propsAndChildren.id || -1;
  }

  componentDidUpdate(
    oldProps: ClickableTextProps,
    newProps: ClickableTextProps,
  ): boolean {
    const isSelectedUsersChanged =
      oldProps.selectedUsers !== newProps.selectedUsers;

    if (isSelectedUsersChanged) {
      const isSelected = newProps.selectedUsers.some(
        (user) => user.id === this.id,
      );

      const className = isSelected
        ? "user-modal__user-item--selected"
        : "user-modal__user-item";
      this.setProps({ className });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
