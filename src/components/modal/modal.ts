import { Block, type PropsAndChildren } from "../../libs/block";

import template from "./modal.hbs?raw";
import "./style.scss";

export type ModalProps = {
  content?: string | Block;
  isVisible?: boolean;
  onClose?: () => void;
};

export class Modal extends Block<ModalProps> {
  constructor(propsAndChildren: PropsAndChildren<ModalProps>) {
    const { isVisible = false, onClose, ...rest } = propsAndChildren;

    super(
      template,
      {
        ...rest,
        isVisible,
        events: {
          click: (e: Event) => this.handleBackdropClick(e),
        },
      },
      true,
    );

    this.onClose = onClose;
  }

  private onClose?: () => void;

  private handleBackdropClick(e: Event) {
    const target = e.target as HTMLElement;

    if (
      target.classList.contains("modal__backdrop") ||
      target.classList.contains("modal")
    ) {
      this.hide();
    }
  }

  public show() {
    this.setProps({ isVisible: true });
    document.body.style.overflow = "hidden";
  }

  public hide() {
    this.setProps({ isVisible: false });
    document.body.style.overflow = "";

    this.onClose?.();
  }

  public toggle() {
    if (this.props.isVisible) {
      this.hide();
      return;
    }

    this.show();
  }
}
