import type { User } from "../../entities/user/user";
import { Block, type PropsAndChildren } from "../../libs/block";
import { withChatUsers, withSelectedUsers } from "../../libs/connect";
import { isEqual } from "../../libs/isEqual";
import { ClickableText } from "../clickableText";

import template from "./searchUsersList.hbs?raw";
import "./style.scss";

type SearchUsersListProps = {
  searchUsers?: User[];
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: User) => void;
};

class SearchUsersListBase extends Block<SearchUsersListProps> {
  constructor(propsAndChildren: PropsAndChildren<SearchUsersListProps>) {
    super(template, propsAndChildren, true);

    this.children.userItems = this.createUserItems(
      propsAndChildren.searchUsers || [],
    );
  }

  private createUserItems(users: User[]) {
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
    oldProps: PropsAndChildren<SearchUsersListProps>,
    newProps: PropsAndChildren<SearchUsersListProps>,
  ): boolean {
    const itemsChanged = !isEqual(
      { items: oldProps.searchUsers },
      { items: newProps.searchUsers },
    );

    if (itemsChanged) {
      const userItems = this.createUserItems(newProps.searchUsers || []);
      this.children.userItems = userItems;
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}

export const SearchUsersList = withChatUsers(SearchUsersListBase);
