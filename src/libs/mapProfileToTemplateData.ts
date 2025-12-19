import { userDataFields, userPasswordFields } from "../entities/user";
import type { UserProfile, UserProfileFields } from "../entities/user";
import type { Password, UserPasswordFields } from "../entities/user/user";

export const mapProfileToTemplateData = (profile: UserProfile) => {
  return Object.entries(profile).map(([name, value]) => ({
    label: userDataFields[name as UserProfileFields].name,
    type: userDataFields[name as UserProfileFields].type,
    value,
    name,
  }));
};

export const mapPasswordToTemplateData = (profile: Password) => {
  return Object.entries(profile).map(([name, value]) => ({
    label: userPasswordFields[name as UserPasswordFields].name,
    type: userPasswordFields[name as UserPasswordFields].type,
    value,
    name,
  }));
};
