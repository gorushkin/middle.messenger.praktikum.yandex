import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./form.hbs?raw";
import { FormValidator } from "./fromValidator";

export class Form extends Block {
  formValidator: FormValidator = new FormValidator();
  constructor(params: {
    onSubmit?: () => void;
    propsAndChildren?: PropsAndChildren;
  }) {
    const { onSubmit, propsAndChildren } = params;

    const formPropsWithEvents = {
      ...propsAndChildren,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const values = this.getFormData(form);
          this.formValidator.setValues(values);
          onSubmit?.();
          console.info(values);
        },
      },
    };
    super(template, formPropsWithEvents, true);
  }

  getFormData = (form: HTMLFormElement): { [key: string]: string } => {
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    return data;
  };
}
