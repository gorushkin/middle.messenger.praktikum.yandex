import type { UserProfile } from "../entities/user";
import { router } from "../libs";
import { HTTPTransport } from "../libs/fetcher";
import { store } from "../libs/store";

const AUTH_ENDPOINT = "/api/v2/user";

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

  async updateProfile(body: UserProfileUpdateRequest) {
    const response = await this.api.put<UserProfile>("/profile", {
      body,
    });

    if (response.ok) {
      store.set("user", response.data);
      router.go("/profile");
    } else {
      const user = store.get<UserProfile>("user", null);
      store.set("user", null);
      store.set("user", user);
    }
  }

  async updatePassword(body: UpdateUserPasswordRequest) {
    const response = await this.api.put<UserProfile>("/password", {
      body,
    });

    if (response.ok) {
      router.go("/profile");
    } else {
      console.error("Failed to update password");
    }
  }

  async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await this.api.put("/profile/avatar", { body: formData });

    if (response.ok) {
      store.set("user", response.data);
      router.go("/profile");
    } else {
      const user = store.get<UserProfile>("user", null);
      store.set("user", null);
      store.set("user", user);
    }
  }
}

export const userApi = new UserAPI();
