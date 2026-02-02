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

type HTTPTransportMethod = (
  // eslint-disable-next-line no-unused-vars
  url: string,
  // eslint-disable-next-line no-unused-vars
  options?: RequestOptions
) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  get: HTTPTransportMethod = (url, options = {}) => {
    let updatedUrl = url;

    if (options.data && !isDataEmpty(options.data)) {
      updatedUrl = url + queryStringify(options.data);
    }

    return this.request(
      updatedUrl,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post: HTTPTransportMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put: HTTPTransportMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete: HTTPTransportMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request(
    url: string,
    options: RequestOptions,
    timeout: number = 5000
  ): Promise<XMLHttpRequest> {
    const { method = METHODS.GET, data, headers = {} } = options;

    const xhr = new XMLHttpRequest();
    xhr.timeout = timeout;

    return new Promise((resolve, reject) => {
      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);
      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

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
