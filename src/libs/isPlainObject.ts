import type { Indexed } from "./store";

export const isPlainObject = (v: unknown): v is Indexed =>
  typeof v === "object" &&
  v !== null &&
  !Array.isArray(v) &&
  Object.prototype.toString.call(v) === "[object Object]";
