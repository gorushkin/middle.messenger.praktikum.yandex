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
  }

  public show() {
    this.setProps({ isVisible: true });
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
