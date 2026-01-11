import type { FormValidator } from "../../../components/form";
import { Input } from "../../../components/input";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chat-input.hbs?raw";
import "./style.scss";

const inputClassname = "chat-input__field";
const inputErrorClassname = "chat-input__field chat-input__field--invalid";

export class ChatInput extends Block {
  formValidator: FormValidator | null = null;
  constructor(
    propsAndChildren: PropsAndChildren,
    params: {
      // eslint-disable-next-line no-unused-vars
      onChange?: (e: Event) => void;
      // eslint-disable-next-line no-unused-vars
      onBlur?: (e: Event) => void;
    } = {}
  ) {
    const isValid = propsAndChildren.isValid ?? true;

    const className = isValid ? inputClassname : inputErrorClassname;

    const input = new Input(
      {
        className,
        type: "text",
        name: "message",
        placeholder: "Сообщение...",
        value: propsAndChildren.value || "",
        id: "chat-input-field",
        isValid: propsAndChildren.isValid || true,
      },
      {
        onChange: (e) => {
          params.onChange?.(e);
        },
        onBlur: (e) => {
          const target = e.target as HTMLInputElement;

          if (!this.formValidator) {
            return;
          }

          const { isValid } = this.formValidator.validateField(
            "message",
            target.value
          );

          this.setProps({ isValid });
        },
      }
    );

    super(
      template,
      {
        input,
        ...propsAndChildren,
      },
      true,
      true
    );
  }

  setValidator(validator: FormValidator) {
    this.formValidator = validator;
  }

  componentDidUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>
  ) {
    const input = this.children.input as Block;

    if (
      input &&
      (oldProps.isValid !== newProps.isValid ||
        oldProps.value !== newProps.value)
    ) {
      const isValid = newProps.isValid ?? true;
      const className = isValid ? inputClassname : inputErrorClassname;

      input.setProps({
        className,
        value: newProps.value || "",
        isValid,
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }
}
