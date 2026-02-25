import { chatsApi } from "../../api/chatApi.ts";
import type { ImageUploaderProps } from "../imageUploader/imageUploader.ts";
import { ImageUploader } from "../imageUploader/index.ts";

export type ChatAvatarProps = ImageUploaderProps & {
  onClose: () => void;
};

export class ChatAvatar extends ImageUploader {
  constructor(props: ChatAvatarProps) {
    super({
      ...props,
      onSave: async (file) => {
        await chatsApi.updateChatAvatar(file);

        if (props.onClose) {
          props.onClose();
        }
      },
    });
  }
}
