import { EventBus } from "./eventBus";

type Indexed<T = unknown> = {
  // eslint-disable-next-line no-unused-vars
  [key in string]: T;
};

function set(object: unknown, path: string, value: unknown): unknown {
  if (!path || typeof path !== "string") {
    throw new Error("path must be string");
  }

  const isPlainObject = (v: unknown): v is Indexed =>
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    Object.prototype.toString.call(v) === "[object Object]";

  function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
      if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
        continue;
      }

      try {
        if ((rhs[p] as any).constructor === Object) {
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

class Store extends EventBus {
  private state: Indexed = {};

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

export const store = new Store();
