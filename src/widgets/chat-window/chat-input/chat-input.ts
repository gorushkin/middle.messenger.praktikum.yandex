import { Input } from "../../../components/input";
import { InputBlock, type PropsAndChildren } from "../../../libs/block";

import "./style.scss";

const inputClassname = "chat-input__wrapper";
const inputErrorClassname = "chat-input__wrapper chat-input__wrapper--invalid";

export class ChatFormInput extends InputBlock {
  input: Input;

  constructor(propsAndChildren?: PropsAndChildren) {
    const input = new Input(
      {
        type: propsAndChildren?.type || "text",
        name: propsAndChildren?.name || "",
        placeholder: propsAndChildren?.placeholder || "",
        id: propsAndChildren?.id || "",
        className: "chat-input__field",
      },
      {
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;
          this.validate(target.value);
        },
      },
    );

    super(`<div class="{{className}}">{{{input}}}</div>`, {
      input,
      className: inputClassname,
    });

    this.name = String(propsAndChildren?.name || "");

    this.input = input;
  }

  reset() {
    this.input.reset();
  }

  validate(value: string): void {
    if (!this.formValidator || !this?.name) {
      return;
    }

    const result = this.formValidator.validateField(String(this.name), value);

    const nextClassname = result.isValid ? inputClassname : inputErrorClassname;

    this.setProps({
      isValid: result.isValid,
      className: nextClassname,
    });
  }
}

export const message = new ChatFormInput({
  type: "text",
  name: "message",
  placeholder: "Сообщение...",
});
