import type { User } from "../../entities/user/user";
import { Block, type PropsAndChildren } from "../../libs/block";
import { withSearchForNewChat } from "../../libs/connect";
import { store } from "../../libs/store";
import { Popup } from "../popup/popup";
import { SearchInput } from "../searchInput";
import { SearchUsersListForNewChat } from "../searchUsersList";

import template from "./searchWithResults.hbs?raw";
import "./style.scss";

type SearchWithResultsProps = {
  placeholder?: string;
  className?: string;
  searchUsers?: User[];
  // eslint-disable-next-line no-unused-vars
  onInput?: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  onUserClick?: (user: User) => void;
};

class SearchWithResultsBase extends Block<SearchWithResultsProps> {
  private popup: Popup;

  constructor(propsAndChildren: PropsAndChildren<SearchWithResultsProps>) {
    const {
      placeholder = "Поиск",
      className = "",
      onInput,
      onUserClick,
    } = propsAndChildren;

    const searchInput = new SearchInput({
      placeholder,
      className,
      onInput: (value: string) => {
        if (value.trim() === "") {
          this.popup.hide();
          store.set("searchForNewChat", []);
          return;
        }
        onInput?.(value);
      },
    });

    const usersList = new SearchUsersListForNewChat({
      showFullName: true,
      onUserClick: (user: User) => {
        onUserClick?.(user);
      },
    });

    const popup = new Popup({
      content: usersList,
      isVisible: false,
      position: {
        y: "bottom",
        yValue: -110,
        x: "left",
        xValue: 0,
      },
    });

    super(
      template,
      {
        searchInput,
        popup,
      },
      true,
    );

    this.popup = popup;

    if (
      propsAndChildren.searchUsers &&
      propsAndChildren.searchUsers.length > 0
    ) {
      this.popup.show();
    }
  }

  public showResults() {
    this.popup.show();
  }

  public hideResults() {
    this.popup.hide();
  }

  componentDidUpdate(
    oldProps: PropsAndChildren<SearchWithResultsProps>,
    newProps: PropsAndChildren<SearchWithResultsProps>,
  ): boolean {
    const oldUsersLength = oldProps.searchUsers?.length || 0;
    const newUsersLength = newProps.searchUsers?.length || 0;

    if (newUsersLength > 0 && oldUsersLength !== newUsersLength) {
      this.showResults();
    } else if (newUsersLength === 0 && oldUsersLength > 0) {
      this.hideResults();
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}

export const SearchWithResults = withSearchForNewChat(SearchWithResultsBase);
