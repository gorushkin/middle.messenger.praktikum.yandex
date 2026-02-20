import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./popup.hbs?raw";
import "./style.scss";

export type PopupPosition = {
  x?: "left" | "right";
  y?: "top" | "bottom";
  xValue?: number;
  yValue?: number;
};

export type PopupProps = {
  content?: string | Block;
  isVisible?: boolean;
  position?: PopupPosition;
  x?: "left" | "right";
  y?: "top" | "bottom";
  xValue?: number;
  yValue?: number;
  events?: Record<string, EventListener>;
  id: string | null;
};

export class Popup extends Block<PopupProps> {
  constructor(propsAndChildren: PropsAndChildren<PopupProps>) {
    const { position = {}, isVisible = false, ...rest } = propsAndChildren;
    const { x = "right", y = "top", xValue = 0, yValue = 0 } = position;

    super(
      template,
      {
        ...rest,
        isVisible,
        x,
        y,
        xValue,
        yValue,
      },
      true,
    );

    this.setProps({ id: this._id });
  }

  public show() {
    this.setProps({ isVisible: true });

    const onceClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(`[data-popup-id="${this._id}"]`)) {
        return;
      }

      this.hide();
      document.removeEventListener("click", onceClickOutside);
    };

    document.addEventListener("click", onceClickOutside);
  }

  public hide() {
    this.setProps({ isVisible: false });
  }

  public toggle() {
    this.setProps({ isVisible: !this.props.isVisible });
  }

  public setPosition(position: PopupPosition) {
    const { x = "right", y = "top", xValue = 0, yValue = 0 } = position;
    this.setProps({ x, y, xValue, yValue });
  }
}
