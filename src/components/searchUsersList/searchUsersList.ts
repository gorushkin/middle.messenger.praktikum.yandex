import type { User } from "../../entities/user/user";
import { Block, type PropsAndChildren } from "../../libs/block";
import {
  withChatUsers,
  withSearchForNewChat,
  withSearchForExistingChat,
  withSelectedUsers,
  withCurrentChatUsers,
} from "../../libs/connect";
import { isEqual } from "../../libs/isEqual";
import { ClickableText } from "../clickableText";

import template from "./searchUsersList.hbs?raw";
import "./style.scss";

export type SearchUsersListProps = {
  searchUsers?: User[];
  className?: string;
  showFullName?: boolean;
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: User) => void;
};

export class SearchUsersListBase extends Block<SearchUsersListProps> {
  constructor(propsAndChildren: PropsAndChildren<SearchUsersListProps>) {
    const userItems = propsAndChildren.searchUsers
      ? SearchUsersListBase.prototype.createUserItems.call(
          { props: propsAndChildren },
          propsAndChildren.searchUsers,
        )
      : [];

    super(template, { ...propsAndChildren, userItems }, true);
  }

  private createUserItems(users: User[]) {
    const { showFullName = false, className = "search-users-list__item" } =
      this.props;

    return users.map(
      (user) =>
        new (withSelectedUsers(ClickableText))({
          text: showFullName
            ? `${user.first_name} ${user.second_name} (@${user.login})`
            : user.login,
          id: user.id,
          className,
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

export const SearchUsersListForNewChat =
  withSearchForNewChat(SearchUsersListBase);

export const SearchUsersListForExistingChat =
  withSearchForExistingChat(SearchUsersListBase);

export const SearchUsersListForCurrentChat =
  withCurrentChatUsers(SearchUsersListBase);
