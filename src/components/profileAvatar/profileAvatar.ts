import { userApi } from "../../api/userApi.ts";
import type { ImageUploaderProps } from "../imageUploader/imageUploader.ts";
import { ImageUploader } from "../imageUploader/index.ts";

export class ProfileAvatar extends ImageUploader {
  constructor(props: ImageUploaderProps = {}) {
    super({
      ...props,
      onSave: async (file) => {
        await userApi.updateAvatar(file);
      },
    });
  }
}
