import type { UserProfile } from "../entities/user";
import { router } from "../libs";
import { HTTPTransport } from "../libs/fetcher";
import { store } from "../libs/store";

const AUTH_ENDPOINT = "/api/v2/user";
const PROFILE_URL = "/profile";
const PASSWORD_URL = "/password";

export type UserProfileUpdateRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdateUserPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

class UserAPI {
  private api = new HTTPTransport(AUTH_ENDPOINT);

  async updateProfile(data: UserProfileUpdateRequest) {
    const response = await this.api.put<UserProfile>(PROFILE_URL, {
      data,
    });

    if (response.ok) {
      store.set("user", response.data);
      router.go("/profile");
    } else {
      const user = store.get<UserProfile>("user", null);
      // TODO: replace with proper error handling
      store.set("user", null);
      store.set("user", user);
    }
  }

  async updatePassword(data: UpdateUserPasswordRequest) {
    const response = await this.api.put<UserProfile>(PASSWORD_URL, {
      data,
    });

    if (response.ok) {
      router.go("/profile");
    } else {
      console.error("Failed to update password");
    }
  }
}

export const userApi = new UserAPI();
