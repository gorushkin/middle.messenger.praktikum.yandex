import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./searchInput.hbs?raw";
import "./style.scss";

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onInput?: (value: string) => void;
};

export class SearchInput extends Block<SearchInputProps> {
  constructor(
    propsAndChildren: PropsAndChildren<SearchInputProps>,
    events?: Record<string, EventListener>,
  ) {
    const { placeholder = "Поиск", className = "", onInput } = propsAndChildren;

    const inputEvents = {
      ...events,
      input: (e: Event) => {
        const target = e.target as HTMLInputElement;
        onInput?.(target.value);
      },
    };

    super(
      template,
      {
        placeholder,
        className,
        events: inputEvents,
      },
      true,
    );
  }
}
