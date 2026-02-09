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

interface RequestOptions {
  data?: PlainObject;
  headers?: Record<string, string>;
  method?: HTTPMethod;
  timeout?: number;
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

type HTTPTransportMethod<T = unknown, E = string> = (
  // eslint-disable-next-line no-unused-vars
  url: string,
  // eslint-disable-next-line no-unused-vars
  options?: RequestOptions,
) => Promise<Response<T, E>>;

type Response<T = unknown, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export class HTTPTransport {
  private baseUrl: string = "https://ya-praktikum.tech";

  private url = "";

  constructor(url: string) {
    this.url = url;
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
      this.baseUrl + this.url + updatedUrl,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post = async <T = unknown, E = string>(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response<T, E>> => {
    const fullUrl = this.baseUrl + this.url + url;

    return await this.request<T, E>(
      fullUrl,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put: HTTPTransportMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete: HTTPTransportMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request<T, E>(
    url: string,
    options: RequestOptions,
    timeout: number = 5000,
  ): Promise<Response<T, E>> {
    const { method = METHODS.GET, data, headers = {} } = options;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = timeout;

    return new Promise((resolve, reject) => {
      xhr.open(method, url);

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject({
            ok: false,
            error: `HTTP error ${xhr.status}: ${xhr.statusText}` as E,
          });
        }

        resolve({ ok: true, data: JSON.parse(xhr.response) as T });
      };
      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      xhr.setRequestHeader("Content-Type", "application/json");

      Object.entries(headers).forEach(([key, value]: [string, string]) => {
        xhr.setRequestHeader(key, value);
      });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
