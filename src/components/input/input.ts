import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./input.hbs?raw";

export class Input extends Block {
  // eslint-disable-next-line no-unused-vars
  validation: ((value: string) => boolean) | null = null;
  constructor(
    propsAndChildren: PropsAndChildren,
    params: {
      // eslint-disable-next-line no-unused-vars
      onChange?: (e: Event) => void;
      // eslint-disable-next-line no-unused-vars
      onBlur?: (e: Event) => void;
      // eslint-disable-next-line no-unused-vars
      validation?: (value: string) => boolean;
      debug?: string;
    } = { onChange: () => {}, onBlur: () => {} }
  ) {
    super(
      template,
      {
        ...propsAndChildren,
        events: {
          input: (e: Event) => {
            params?.onChange?.(e);
          },
          blur: (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (params.validation) {
              this?.validation?.(target.value);
            }

            params?.onBlur?.(e);
          },
        },
      },
      true
    );
    this.validation = params.validation ?? null;
  }
}
