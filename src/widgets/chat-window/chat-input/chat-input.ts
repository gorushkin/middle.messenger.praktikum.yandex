import { Input } from "../../../components/input";
import { FormsWithValidatorsAndFields } from "../../../components/userForm/userForm/userForm";
import { InputBlock, type PropsAndChildren } from "../../../libs/block";

import template from "./chat-input.hbs?raw";
import "./style.scss";

const inputClassname = "chat-input__wrapper";
const inputErrorClassname = "chat-input__wrapper chat-input__wrapper--invalid";

export class ChatFormWrapper extends FormsWithValidatorsAndFields {
  constructor(propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren);
  }
}

export class ChatFormInput extends InputBlock {
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
        debug: "input in ChatFormInput",
      }
    );

    super(`<div class="{{className}}">{{{input}}}</div>`, {
      input,
      className: inputClassname,
    });

    this.name = String(propsAndChildren?.name || "");
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

// export class ChatInputOld extends Block {
//   formValidator: FormValidator | null = null;
//   constructor(
//     propsAndChildren: PropsAndChildren,
//     params: {
//       // eslint-disable-next-line no-unused-vars
//       onChange?: (e: Event) => void;
//       // eslint-disable-next-line no-unused-vars
//       onBlur?: (e: Event) => void;
//     } = {}
//   ) {
//     const isValid = propsAndChildren.isValid ?? true;

//     const className = isValid ? inputClassname : inputErrorClassname;

//     const input = new Input(
//       {
//         className,
//         type: "text",
//         name: "message",
//         placeholder: "Сообщение...",
//         value: propsAndChildren.value || "",
//         id: "chat-input-field",
//         isValid: propsAndChildren.isValid || true,
//       },
//       {
//         onChange: (e) => {
//           params.onChange?.(e);
//         },
//         onBlur: (e) => {
//           const target = e.target as HTMLInputElement;

//           if (!this.formValidator) {
//             return;
//           }

//           const { isValid } = this.formValidator.validateField(
//             "message",
//             target.value
//           );

//           this.setProps({ isValid });
//         },
//       }
//     );

//     super(
//       template,
//       {
//         input,
//         ...propsAndChildren,
//       },
//       true,
//       true
//     );
//   }

//   setValidator(validator: FormValidator) {
//     this.formValidator = validator;
//   }

//   componentDidUpdate(
//     oldProps: Record<string, unknown>,
//     newProps: Record<string, unknown>
//   ) {
//     const input = this.children.input as Block;

//     if (
//       input &&
//       (oldProps.isValid !== newProps.isValid ||
//         oldProps.value !== newProps.value)
//     ) {
//       const isValid = newProps.isValid ?? true;
//       const className = isValid ? inputClassname : inputErrorClassname;

//       input.setProps({
//         className,
//         value: newProps.value || "",
//         isValid,
//       });
//     }

//     return super.componentDidUpdate(oldProps, newProps);
//   }
// }
