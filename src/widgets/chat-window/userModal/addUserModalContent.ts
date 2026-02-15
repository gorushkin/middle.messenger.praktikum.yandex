import { userApi } from "../../../api";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { SearchUsersListForExistingChat } from "../../../components/searchUsersList";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { getDebounce } from "../../../libs/debauncer";

import template from "./userModal.hbs?raw";

import "./style.scss";

type AddUserModalContentProps = {
  title: string;
  placeholder?: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  onSubmit: () => void;
  onCancel?: () => void;
  showSearch?: boolean;
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: User) => void;
};

export class AddUserModalContent extends Block<AddUserModalContentProps> {
  debounce = getDebounce();

  constructor(propsAndChildren: PropsAndChildren<AddUserModalContentProps>) {
    const {
      title,
      placeholder,
      buttonText,
      buttonVariant = "primary",
      onSubmit,
      onCancel,
      onUserClick,
      showSearch = true,
    } = propsAndChildren;

    const loginInput = showSearch
      ? new Input(
          {
            name: "login",
            type: "text",
            placeholder: placeholder || "",
            className: "user-modal__input",
          },
          {
            onChange: (e: Event) => {
              const target = e.target as HTMLInputElement;
              this.debounce(() => {
                void userApi.searchUsers(target.value, "searchForExistingChat");
              }, 300);
            },
          },
        )
      : null;

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

    const usersList = new SearchUsersListForExistingChat({
      className: "user-modal__user-item",
      showFullName: false,
      onUserClick,
    });

    super(
      template,
      {
        title,
        loginInput,
        submitButton,
        cancelButton,
        usersList,
      },
      true,
    );
  }
}
