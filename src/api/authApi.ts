import type { UserProfile } from "../entities/user/user";
import { router } from "../libs";
import { HTTPTransport } from "../libs/fetcher";
import { store } from "../libs/store";

const AUTH_ENDPOINT = "/api/v2/auth";

export type LoginDataRequest = {
  login: string;
  password: string;
};

export type SignupDataRequest = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

const USER_ALREADY_IN_SYSTEM_REASON = "User already in system";

class AuthAPI {
  private authAPI = new HTTPTransport(AUTH_ENDPOINT);

  async login(body: LoginDataRequest) {
    const response = await this.authAPI.post<
      string,
      { reason: typeof USER_ALREADY_IN_SYSTEM_REASON }
    >("/signin", {
      body,
    });

    if (response.ok) {
      router.go("/chat");
    } else {
      if (response.error.reason === USER_ALREADY_IN_SYSTEM_REASON) {
        router.go("/chat");
        return;
      }
      console.error("Login failed:", response.error);
    }
  }

  async getUser(isRoutePrivate = true) {
    const response = await this.authAPI.get<UserProfile>("/user");

    if (response.ok) {
      store.set("user", response.data);
    } else {
      store.set("user", null);

      if (isRoutePrivate) {
        router.go("/login");
      }
    }
  }

  async signup(body: SignupDataRequest) {
    const response = await this.authAPI.post("/signup", {
      body,
    });

    if (response.ok) {
      router.go("/chat");
    } else {
      console.error("Signup failed:", response.error);
    }
  }

  async logout() {
    await this.authAPI.post("/logout");

    router.go("/login");
  }
}

export const authApi = new AuthAPI();
