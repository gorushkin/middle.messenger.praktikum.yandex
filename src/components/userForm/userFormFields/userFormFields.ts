import { Block, type PropsAndChildren } from "../../../libs/block";
import type { FormValidator } from "../../form";
import { UserFormInput } from "../userFormInput";

export class UserFormFields extends Block {
  fields: UserFormInput[] = [];
  constructor(template: string, propsAndChildren: PropsAndChildren) {
    super(template, propsAndChildren, true);

    Object.values(propsAndChildren).forEach((child) => {
      if (child instanceof UserFormInput) {
        this.fields.push(child);
      }
    });
  }

  setValidator(validator: FormValidator) {
    const inputs = this.fields;

    inputs.forEach((input) => {
      input.setValidator(validator);
    });
  }
}
