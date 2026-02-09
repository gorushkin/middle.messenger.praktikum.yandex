import { router } from "../../libs";
import { HTTPTransport } from "../../libs/fetcher";

const AUTH_ENDPOINT = "/api/v2/auth";
const SIGNIN_URL = "/signin";

export class AuthAPI {
  private authAPI = new HTTPTransport(AUTH_ENDPOINT);

  async login(data: { login: string; password: string }) {
    const response = await this.authAPI.post(SIGNIN_URL, {
      data,
    });

    if (response.ok) {
      router.go("/chats");
    } else {
      console.error("Login failed:", response.error);
    }
  }
}
