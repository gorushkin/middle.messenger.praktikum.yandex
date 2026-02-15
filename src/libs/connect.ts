/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Block } from "./block";
import { isEqual } from "./isEqual";
import { store, STORE_EVENTS, type Indexed } from "./store";

export const connect = <T extends new (...args: any[]) => Block>(
  Component: T,
  mapStateToProps: (state: Indexed) => Indexed,
): T => {
  return class extends Component {
    private prevMappedState: Indexed = {};

    constructor(...args: any[]) {
      const data = mapStateToProps(store.getState());
      const props = { ...args[0], ...data };
      super(props, ...args.slice(1));

      store.on(STORE_EVENTS.UPDATED, () => {
        const data = mapStateToProps(store.getState());

        if (!isEqual(this.prevMappedState, data)) {
          this.prevMappedState = data;
          this.setProps({ ...data });
        }
      });

      this.prevMappedState = mapStateToProps(store.getState());
    }
  } as T;
};

export const withUser = <T extends new (...args: any[]) => Block>(
  Component: T,
): T => connect(Component, (state) => ({ user: state.user }));

export const withChats = <T extends new (...args: any[]) => Block>(
  Component: T,
): T => connect(Component, (state) => ({ chats: state.chats }));

export const withSelectedChat = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    // console.log("state: ", state.selectedChat.id);
    const selectedChatId = (state.selectedChat as { id?: string })?.id ?? -1;

    return {
      selectedChatId,
    };
  });

export const withCurrentChat = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const currentChat = state.selectedChat || null;

    return {
      currentChat,
    };
  });

export const withCurrentChatUsers = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const searchUsers = state.chatUsers || [];

    return {
      searchUsers,
    };
  });

export const withChatUsers = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const searchUsers = state.searchUsers;

    return {
      searchUsers,
    };
  });

export const withSearchForNewChat = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const searchUsers = state.searchForNewChat;

    return {
      searchUsers,
    };
  });

export const withSearchForExistingChat = <
  T extends new (...args: any[]) => Block,
>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const searchUsers = state.searchForExistingChat;

    return {
      searchUsers,
    };
  });

export const withSelectedUsers = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const selectedUsers = state.selectedChatUsers;

    return {
      selectedUsers,
    };
  });

export const withMessages = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const messages = state.messagesHistory || [];

    return {
      messages,
    };
  });

export const withMessagesAndUser = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => ({
    messages: state.messagesHistory || [],
    user: state.user,
  }));

export const withChatToken = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const chatToken = state.chatToken;
    return {
      chatToken,
    };
  });
