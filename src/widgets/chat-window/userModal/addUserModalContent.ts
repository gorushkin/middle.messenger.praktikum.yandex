import { chatsApi, userApi, type ChatData } from "../../../api";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { SearchUsersListForExistingChat } from "../../../components/searchUsersList";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { getDebounce } from "../../../libs/debauncer";
import { store } from "../../../libs/store";

import template from "./userModal.hbs?raw";

import "./style.scss";

type AddUserModalContentProps = {
  title: string;
  placeholder?: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  onClose?: () => void;
  showSearch?: boolean;
};

export class AddUserModalContent extends Block<AddUserModalContentProps> {
  debounce = getDebounce();

  constructor(propsAndChildren: PropsAndChildren<AddUserModalContentProps>) {
    const {
      title,
      placeholder,
      buttonText,
      buttonVariant = "primary",
      onClose,
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
        click: () => {
          void this.handleSubmit(onClose);
        },
      },
    });

    const cancelButton = new Button({
      text: "Отмена",
      type: "button",
      variant: "secondary",
      className: "user-modal__button",
      events: {
        click: () => onClose?.(),
      },
    });

    const usersList = new SearchUsersListForExistingChat({
      className: "user-modal__user-item",
      showFullName: false,
      onUserClick: (user) => this.handleAddUser(user),
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

  private handleAddUser(user: User) {
    const selectedUsers = store.get<User[]>("selectedChatUsers") || [];

    if (!selectedUsers.find((u) => u.id === user.id)) {
      store.set("selectedChatUsers", [...selectedUsers, user]);
    } else {
      const filtered = selectedUsers.filter((u) => u.id !== user.id);
      store.set("selectedChatUsers", filtered);
    }
  }

  private async handleSubmit(onClose?: () => void) {
    const selectedChat = store.get<ChatData>("selectedChat", null);

    if (!selectedChat) {
      console.error("No chat selected");
      return;
    }

    const selectedUsers = store.get<User[]>("selectedChatUsers") || [];

    await chatsApi.addUsersToChat(
      selectedChat.id,
      selectedUsers.map((user) => user.id),
    );

    onClose?.();
  }
}
