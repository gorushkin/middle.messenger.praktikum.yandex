import { getFullUrl } from "../config/config";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type HTTPMethod = (typeof METHODS)[keyof typeof METHODS];

type PlainObject<T = unknown> = {
  [key: string]: T;
};

interface RequestOptions<B = unknown> {
  data?: PlainObject;
  headers?: Record<string, string>;
  method?: HTTPMethod;
  timeout?: number;
  body?: B;
}

function queryStringify(data: PlainObject): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

const isDataEmpty = (data?: PlainObject): boolean => {
  if (!data || Object.keys(data).length === 0) {
    return true;
  }

  return false;
};

type Response<T = unknown, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export class HTTPTransport {
  private url = "";

  constructor(url: string) {
    this.url = url;
  }

  getFullUrl(url: string): string {
    return getFullUrl(this.url + url);
  }
  get = <T = unknown, E = string>(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response<T, E>> => {
    let updatedUrl = url;

    if (options.data && !isDataEmpty(options.data)) {
      updatedUrl = url + queryStringify(options.data);
    }

    return this.request<T, E>(
      this.getFullUrl(updatedUrl),
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post = async <T = unknown, E = string>(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response<T, E>> => {
    return await this.request<T, E>(
      this.getFullUrl(url),
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put = async <T = unknown, E = string>(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response<T, E>> => {
    return this.request(
      this.getFullUrl(url),
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete = async <T = unknown, E = string>(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response<T, E>> => {
    return this.request(
      this.getFullUrl(url),
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  async request<T, E>(
    url: string,
    options: RequestOptions,
    timeout: number = 5000,
  ): Promise<Response<T, E>> {
    const { method = METHODS.GET, body, headers = {} } = options;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = timeout;

    const promise = new Promise((resolve, reject) => {
      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);
      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      const isFormData = body instanceof FormData;

      if (!isFormData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      Object.entries(headers).forEach(([key, value]: [string, string]) => {
        xhr.setRequestHeader(key, value);
      });

      if (method === METHODS.GET || !body) {
        xhr.send();
      } else {
        xhr.send(isFormData ? body : JSON.stringify(body));
      }
    });

    try {
      const xhr = (await promise) as XMLHttpRequest;

      if (xhr.status >= 400) {
        throw JSON.parse(xhr.response) as E;
      }

      try {
        return { ok: true, data: JSON.parse(xhr.response) as T };
      } catch {
        return { ok: true, data: xhr.response as T };
      }
    } catch (error) {
      return { ok: false, error: error as E };
    }
  }
}
