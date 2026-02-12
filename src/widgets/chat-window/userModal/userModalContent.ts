import { userApi } from "../../../api";
import { Button } from "../../../components/button";
import { ClickableText } from "../../../components/clickableText";
import { Input } from "../../../components/input";
import type { UserProfileSearch } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withSelectedUsers } from "../../../libs/connect";
import { getDebounce } from "../../../libs/debauncer";
import { isEqual } from "../../../libs/isEqual";

import template from "./userModalContent.hbs?raw";

import "./style.scss";

type UserModalContentProps = {
  title: string;
  placeholder: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  onSubmit: () => void;
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: UserProfileSearch) => void;
  searchUsers: UserProfileSearch[];
};

export class UserModalContent extends Block<UserModalContentProps> {
  debounce = getDebounce();
  constructor(propsAndChildren: PropsAndChildren<UserModalContentProps>) {
    const {
      title,
      placeholder,
      buttonText,
      buttonVariant = "primary",
      searchUsers,
      onSubmit,
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
            void userApi.searchUsers(target.value);
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

    super(
      template,
      {
        ...propsAndChildren,
        searchUsers,
        title,
        loginInput,
        submitButton,
        userItems: [],
      },
      true,
    );

    this.children.userItems = this.createUserItems(searchUsers || []);
  }

  private createUserItems(users: UserProfileSearch[]) {
    return users.map(
      (user) =>
        new (withSelectedUsers(ClickableText))({
          text: user.login,
          id: user.id,
          className: "user-modal__user-item",
          events: {
            click: () => {
              if (this.props.onUserClick) {
                this.props.onUserClick(user);
              }
            },
          },
        }),
    );
  }

  componentDidUpdate(
    oldProps: UserModalContentProps,
    newProps: UserModalContentProps,
  ): boolean {
    const itemsChanged = !isEqual(
      { items: oldProps.searchUsers },
      { items: newProps.searchUsers },
    );

    if (itemsChanged) {
      const searchUsers = this.createUserItems(newProps.searchUsers || []);
      this.children.searchUsers = searchUsers;
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
