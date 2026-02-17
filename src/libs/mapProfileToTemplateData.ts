import { userDataFields, userPasswordFields } from "../entities/user";
import type { UserProfile, UserProfileFields } from "../entities/user";
import type { Password, UserPasswordFields } from "../entities/user/user";

type MappedProfileData = {
  label: string;
  type: string;
  value: string | number | null;
  name: string;
};

export const mapProfileToTemplateData = (
  profile: UserProfile,
): MappedProfileData[] => {
  return Object.entries(profile)
    .filter((item) => !!userDataFields[item[0] as UserProfileFields]?.name)
    .map(([name, value]) => {
      return {
        label: userDataFields[name as UserProfileFields].name,
        type: userDataFields[name as UserProfileFields].type,
        value,
        name,
      };
    });
};

export const mapPasswordToTemplateData = (profile: Password) => {
  return Object.entries(profile).map(([name, value]) => ({
    label: userPasswordFields[name as UserPasswordFields].name,
    type: userPasswordFields[name as UserPasswordFields].type,
    value,
    name,
  }));
};
