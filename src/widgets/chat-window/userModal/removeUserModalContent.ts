import { chatsApi, type ChatData } from "../../../api";
import { Button } from "../../../components/button";
import { SearchUsersListForCurrentChat } from "../../../components/searchUsersList";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { store } from "../../../libs/store";

import template from "./userModal.hbs?raw";

import "./style.scss";

type RemoveUserModalContentProps = {
  title: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "link";
  onClose?: () => void;
};

export class RemoveUserModalContent extends Block<RemoveUserModalContentProps> {
  constructor(propsAndChildren: PropsAndChildren<RemoveUserModalContentProps>) {
    const {
      title,
      buttonText,
      buttonVariant = "primary",
      onClose,
    } = propsAndChildren;

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

    const usersList = new SearchUsersListForCurrentChat({
      className: "user-modal__user-item",
      showFullName: false,
      onUserClick: (user) => this.handleRemoveUser(user),
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

  private handleRemoveUser(user: User) {
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

    await chatsApi.deleteUsersFromChat(
      selectedChat.id,
      selectedUsers.map((user) => user.id),
    );

    await chatsApi.getChatUsers(selectedChat.id);

    onClose?.();
  }
}
