import type { Block } from "./block";
// import { isPlainObject } from "./isPlainObject";
import { store, STORE_EVENTS, type Indexed } from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const connect = <T extends new (...args: any[]) => Block>(
  Component: T,
  // eslint-disable-next-line no-unused-vars
  mapStateToProps: (state: Indexed) => Indexed,
): T => {
  return class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

      store.on(STORE_EVENTS.UPDATED, () => {
        const data = mapStateToProps(store.getState());
        this.setProps({ ...data });
      });
    }
  } as T;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export const withUser = <T extends new (...args: any[]) => Block>(
  Component: T,
): T => connect(Component, (state) => ({ user: state.user }));

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export const withChats = <T extends new (...args: any[]) => Block>(
  Component: T,
): T => connect(Component, (state) => ({ chats: state.chats }));

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line no-unused-vars
export const withChatUsers = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const searchUsers = state.searchUsers;

    return {
      searchUsers,
    };
  });

// eslint-disable-next-line no-unused-vars
export const withSelectedUsers = <T extends new (...args: any[]) => Block>(
  Component: T,
): T =>
  connect(Component, (state) => {
    const selectedUsers = state.selectedChatUsers;

    return {
      selectedUsers,
    };
  });
