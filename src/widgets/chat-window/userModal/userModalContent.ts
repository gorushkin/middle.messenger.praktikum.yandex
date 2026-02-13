import { userApi } from "../../../api";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { SearchUsersListForExistingChat } from "../../../components/searchUsersList";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { getDebounce } from "../../../libs/debauncer";

import template from "./userModalContent.hbs?raw";

import "./style.scss";

type UserModalContentProps = {
  title: string;
  placeholder: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  onSubmit: () => void;
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: User) => void;
};

export class UserModalContent extends Block<UserModalContentProps> {
  debounce = getDebounce();

  constructor(propsAndChildren: PropsAndChildren<UserModalContentProps>) {
    const {
      title,
      placeholder,
      buttonText,
      buttonVariant = "primary",
      onSubmit,
      onUserClick,
    } = propsAndChildren;

    const loginInput = new Input(
      {
        name: "login",
        type: "text",
        placeholder,
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
    );

    const submitButton = new Button({
      text: buttonText,
      type: "button",
      variant: buttonVariant,
      className: "user-modal__button",
      events: {
        click: () => onSubmit?.(),
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
        usersList,
      },
      true,
    );
  }
}
