import type { UserProfile } from "../../entities/user/user";
import { router } from "../../libs";
import { HTTPTransport } from "../../libs/fetcher";
import { store } from "../../libs/store";

const AUTH_ENDPOINT = "/api/v2/auth";
const SIGNIN_URL = "/signin";
const USERS_URL = "/user";

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

  async getUser() {
    const response = await this.authAPI.get<UserProfile>(USERS_URL);

    if (response.ok) {
      store.set("user", response.data);
    } else {
      store.set("user", null);
    }
  }
}

export const authApi = new AuthAPI();
