import type { ChatData } from "../api/chatApi";
import type { HistoricalMessage, TextMessage } from "../api/messagesTypes";
import type { User, UserProfile } from "../entities/user";

import { EventBus } from "./eventBus";
import { isPlainObject } from "./isPlainObject";

export type Indexed<T = unknown> = {
  // eslint-disable-next-line no-unused-vars
  [key in string]: T;
};

export interface AppState {
  user: UserProfile | null;
  chats: ChatData[];
  selectedChat: ChatData | { id: number } | null;
  chatToken: string | null;
  chatUsers: User[];
  selectedChatUsers: User[];
  searchUsers: UserProfile[];
  searchForNewChat: UserProfile[];
  searchForExistingChat: UserProfile[];

  messagesByChatId: Record<number, (TextMessage | HistoricalMessage)[]>;
}

function set(object: unknown, path: string, value: unknown): unknown {
  if (!path || typeof path !== "string") {
    throw new Error("path must be string");
  }

  function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
      if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
        continue;
      }

      try {
        if (
          (rhs[p] as unknown as Record<string, unknown>).constructor === Object
        ) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch {
        lhs[p] = rhs[p];
      }
    }

    return lhs;
  }

  const getObject = (path: string, val: unknown): Indexed => {
    if (!path || typeof path !== "string") {
      throw new Error("path must be string");
    }

    const keys = path.split(".");

    keys.forEach((key) => {
      if (!key) {
        throw new Error("path must be string");
      }
    });

    return keys.reduceRight<unknown>(
      (acc, curr) => ({ [curr]: acc }),
      val,
    ) as Indexed;
  };

  if (!isPlainObject(object)) {
    return object;
  }

  const patch = getObject(path, value);
  return merge(object, patch);
}

export const STORE_EVENTS = {
  UPDATED: "updated",
};

const initialState: AppState = {
  user: null,
  chats: [],
  selectedChat: null,

  chatToken: null,
  chatUsers: [],
  selectedChatUsers: [],
  searchUsers: [],

  searchForNewChat: [],
  searchForExistingChat: [],

  messagesByChatId: {},
};

class Store extends EventBus {
  private state: Indexed = {};

  constructor(initial: Indexed = {}) {
    super();
    this.state = structuredClone(initial);
  }

  public reset(initial: Indexed = {}) {
    this.state = structuredClone(initial);
  }

  public getState() {
    return this.state;
  }

  static EVENTS = STORE_EVENTS;

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(Store.EVENTS.UPDATED);
  }

  public get<T>(path: string, defaultValue = null): T | null {
    if (!path || typeof path !== "string") {
      throw new Error("path must be string");
    }

    const [firstKey, ...restKeys] = path.split(".");

    if (!firstKey) {
      throw new Error("path must be string");
    }

    if (!restKeys.length) {
      return (this.state[firstKey] as T) ?? defaultValue;
    }

    return null;
  }
}

class TypedStore<T> {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public getState() {
    return this.store.getState() as T;
  }

  static EVENTS = STORE_EVENTS;

  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.store.set(key as string, value);
  }

  // eslint-disable-next-line no-unused-vars
  public get<K extends keyof T>(key: K): T[K] | null;
  // eslint-disable-next-line no-unused-vars
  public get<K extends keyof T, D>(key: K, defaultValue: D): T[K] | D;
  public get<K extends keyof T, D = null>(
    key: K,
    defaultValue?: D,
  ): T[K] | D | null {
    const result = this.store.get<T[K]>(key as string, null);
    if (result === null && defaultValue !== undefined) {
      return defaultValue;
    }
    return result as T[K] | D | null;
  }

  public on(event: string, callback: () => void): void {
    this.store.on(event, callback);
  }

  public off(event: string, callback: () => void): void {
    this.store.off(event, callback);
  }

  public reset() {
    this.store.reset(initialState as unknown as Indexed);
  }
}

const storeInstance = new Store(initialState as unknown as Indexed);
export const store = new TypedStore<AppState>(storeInstance);

type Msg = TextMessage | HistoricalMessage;

class MessagesStore extends TypedStore<AppState> {
  setMessages(chatId: number, messages: Msg[]) {
    const prev = store.get("messagesByChatId", {});
    store.set("messagesByChatId", { ...prev, [chatId]: messages });
  }

  addMessage(chatId: number, message: Msg) {
    const map = store.get("messagesByChatId", {}) as Record<number, Msg[]>;
    const prev = map[chatId] ?? [];
    store.set("messagesByChatId", { ...map, [chatId]: [...prev, message] });
  }

  getMessages(chatId: number): Msg[] {
    const map = store.get("messagesByChatId", {}) as Record<number, Msg[]>;
    return map[chatId] ?? [];
  }
}

export const messagesStore = new MessagesStore(storeInstance);
