import { expect } from "chai";

import { baseUrl } from "../../config/config.ts";
import { HTTPTransport } from "./fetcher.ts";

type LoadHandler = () => void;

class MockXMLHttpRequest {
  method = "";
  url = "";
  requestHeaders: Record<string, string> = {};
  requestBody: unknown;
  status = 0;
  response: string = "";
  withCredentials = false;
  timeout = 0;

  onload?: LoadHandler;
  onerror?: LoadHandler;
  onabort?: LoadHandler;
  ontimeout?: LoadHandler;

  private readonly registry: MockXMLHttpRequest[];

  constructor(registry: MockXMLHttpRequest[]) {
    this.registry = registry;
    this.registry.push(this);
  }

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  setRequestHeader(key: string, value: string) {
    this.requestHeaders[key] = value;
  }

  send(body?: unknown) {
    this.requestBody = body;
  }

  respond(status: number, _headers: Record<string, string>, body: string) {
    this.status = status;
    this.response = body;
    this.onload?.();
  }
}

describe("HTTPTransport", () => {
  let requests: MockXMLHttpRequest[];
  let transport: HTTPTransport;

  beforeEach(() => {
    requests = [];
    (
      globalThis as unknown as { XMLHttpRequest: typeof MockXMLHttpRequest }
    ).XMLHttpRequest = class extends MockXMLHttpRequest {
      constructor() {
        super(requests);
      }
    };
    transport = new HTTPTransport("/auth");
  });

  afterEach(() => {
    delete (
      globalThis as unknown as { XMLHttpRequest?: typeof MockXMLHttpRequest }
    ).XMLHttpRequest;
  });

  it("builds full url using baseUrl", () => {
    expect(transport.getFullUrl("/user")).to.equal(`${baseUrl}/auth/user`);
  });

  it("adds query string on GET when data provided", async () => {
    const responsePromise = transport.get("/chats", {
      data: { offset: 0, limit: 10 },
    });

    expect(requests).to.have.length(1);
    expect(requests[0].url).to.equal(`${baseUrl}/auth/chats?offset=0&limit=10`);

    requests[0].respond(200, { "Content-Type": "application/json" }, "[]");
    const response = await responsePromise;
    expect(response).to.deep.equal({ ok: true, data: [] });
  });

  it("does not append query when data is empty", async () => {
    const responsePromise = transport.get("/chats", { data: {} });

    expect(requests[0].url).to.equal(`${baseUrl}/auth/chats`);

    requests[0].respond(200, { "Content-Type": "application/json" }, "[]");
    const response = await responsePromise;
    expect(response.ok).to.be.true;
  });

  it("sends JSON body and sets content-type on POST", async () => {
    const payload = { login: "user", password: "123" };
    const responsePromise = transport.post("/signin", { body: payload });

    const [request] = requests;
    expect(request.method).to.equal("POST");
    expect(request.requestHeaders["Content-Type"]).to.equal("application/json");
    expect(request.requestBody).to.equal(JSON.stringify(payload));

    request.respond(200, { "Content-Type": "application/json" }, "{}");
    const response = await responsePromise;
    expect(response).to.deep.equal({ ok: true, data: {} });
  });

  it.only("omits content-type when FormData is used", async () => {
    const formData = new FormData();
    formData.append("avatar", "file");

    const responsePromise = transport.put("/avatar", { body: formData });

    const [request] = requests;
    expect(request.requestHeaders["Content-Type"]).to.be.undefined;
    expect(request.requestBody).to.equal(formData);

    request.respond(200, { "Content-Type": "application/json" }, "{}");
    const response = await responsePromise;
    expect(response.ok).to.be.true;
  });

  it("returns raw response when body is not JSON", async () => {
    const responsePromise = transport.get("/ping");

    requests[0].respond(200, { "Content-Type": "text/plain" }, "pong");
    const response = await responsePromise;
    expect(response).to.deep.equal({ ok: true, data: "pong" });
  });

  it("returns parsed error for 4xx/5xx responses", async () => {
    const responsePromise = transport.get("/chats");

    requests[0].respond(
      400,
      { "Content-Type": "application/json" },
      JSON.stringify({ reason: "Bad request" }),
    );
    const response = await responsePromise;

    expect(response.ok).to.be.false;
    if (!response.ok) {
      expect(response.error).to.deep.equal({ reason: "Bad request" });
    }
  });
});
