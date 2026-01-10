import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./form.hbs?raw";

export class Form extends Block {
  constructor(propsAndChildren?: PropsAndChildren) {
    const formPropsWithEvents = {
      ...propsAndChildren,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const values = this.getFormData(form);
          console.log(values);
          form.reset();
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
