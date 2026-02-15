import { Button } from "../../../components/button";
import { SearchUsersListForCurrentChat } from "../../../components/searchUsersList";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./userModal.hbs?raw";

import "./style.scss";

type RemoveUserModalContentProps = {
  title: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  onSubmit: () => void;
  onCancel?: () => void;
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: User) => void;
};

export class RemoveUserModalContent extends Block<RemoveUserModalContentProps> {
  constructor(propsAndChildren: PropsAndChildren<RemoveUserModalContentProps>) {
    const {
      title,
      buttonText,
      buttonVariant = "primary",
      onSubmit,
      onCancel,
      onUserClick,
    } = propsAndChildren;

    const submitButton = new Button({
      text: buttonText,
      type: "button",
      variant: buttonVariant,
      className: "user-modal__button",
      events: {
        click: () => onSubmit?.(),
      },
    });

    const cancelButton = new Button({
      text: "Отмена",
      type: "button",
      variant: "secondary",
      className: "user-modal__button",
      events: {
        click: () => onCancel?.(),
      },
    });

    const usersList = new SearchUsersListForCurrentChat({
      className: "user-modal__user-item",
      showFullName: false,
      onUserClick,
    });

    super(
      template,
      {
        title,
        loginInput: null,
        submitButton,
        cancelButton,
        usersList,
      },
      true,
    );
  }
}
