import { chatsApi, type ChatData } from "../../../api";
import { IconButton } from "../../../components/iconButton";
import { Image } from "../../../components/image";
import { Modal } from "../../../components/modal";
import { Popup } from "../../../components/popup";
import type { User } from "../../../entities/user/user";
import { Block, type PropsAndChildren } from "../../../libs/block";
import { withChatUsers } from "../../../libs/connect";
import { store } from "../../../libs/store";
import { AddUserModalContent } from "../userModal/addUserModalContent";
import { RemoveUserModalContent } from "../userModal/removeUserModalContent";

import template from "./chatSettingsButton.hbs?raw";
import { ChatSettingsPopupContent } from "./chatSettingsPopupContent";

import "../userModal/style.scss";
import "./chatSettingsPopupContent.scss";
import "./style.scss";

export class ChatSettingsButton extends Block {
  private popup: Popup;
  private addUserModal: Modal;
  private removeUserModal: Modal;

  constructor(propsAndChildren: PropsAndChildren) {
    const icon = new Image({
      src: "/actions_dots.svg",
      alt: "Chat actions",
    });

    const button = new IconButton({
      content: icon,
      className: "chat-settings-button",
      events: {
        click: (e: Event) => this.handleButtonClick(e),
      },
    });

    const addUserModalContent = new (withChatUsers(AddUserModalContent))({
      title: "Добавить пользователя",
      placeholder: "Логин пользователя",
      buttonText: "Добавить",
      buttonVariant: "primary",
      showSearch: true,
      onSubmit: () => this.handleAddUsersSubmit(),
      onCancel: () => this.addUserModal.hide(),
      onUserClick: (user) => {
        this.handleAddUser(user);
      },
    });

    const removeUserModalContent = new RemoveUserModalContent({
      title: "Удалить пользователя",
      buttonText: "Удалить",
      buttonVariant: "primary",
      onSubmit: () => this.handleRemoveUsersSubmit(),
      onCancel: () => this.removeUserModal.hide(),
      onUserClick: (user) => {
        this.handleRemoveUser(user);
      },
    });

    const addUserModal = new Modal({
      content: addUserModalContent,
      isVisible: false,
    });

    const removeUserModal = new Modal({
      content: removeUserModalContent,
      isVisible: false,
    });

    const popupContent = new ChatSettingsPopupContent({
      onAddUserClick: () => this.openAddUserModal(),
      onRemoveUserClick: () => this.openRemoveUserModal(),
      onDeleteChatClick: () => this.handleDeleteChat(),
    });

    const popup = new Popup({
      content: popupContent,
      isVisible: false,
      position: {
        x: "right",
        y: "top",
        xValue: 0,
        yValue: 40,
      },
      events: {
        click: (e: Event) => {
          e.stopPropagation();
        },
      },
    });

    super(
      template,
      { ...propsAndChildren, button, popup, addUserModal, removeUserModal },
      true,
    );
    this.popup = popup;
    this.addUserModal = addUserModal;
    this.removeUserModal = removeUserModal;
  }

  private handleButtonClick(e: Event) {
    e.stopPropagation();
    this.popup.show();
  }

  private openAddUserModal() {
    this.popup.hide();
    this.addUserModal.show();
  }

  private openRemoveUserModal() {
    this.popup.hide();
    this.removeUserModal.show();
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

  private async handleAddUsersSubmit() {
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
    this.addUserModal.hide();
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

  async handleRemoveUsersSubmit() {
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

    this.removeUserModal.hide();
  }

  private async handleDeleteChat() {
    const selectedChat = store.get<ChatData>("selectedChat", null);

    if (!selectedChat) {
      console.error("No chat selected");
      return;
    }

    const confirmed = confirm(
      `Вы уверены, что хотите удалить чат "${selectedChat.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await chatsApi.deleteChat(selectedChat.id);
      this.popup.hide();
      store.set("selectedChat", { id: -1 });
      await chatsApi.fetchChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  }
}
