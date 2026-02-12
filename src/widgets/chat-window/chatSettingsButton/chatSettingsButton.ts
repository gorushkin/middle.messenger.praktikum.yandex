import { IconButton } from "../../../components/iconButton";
import { Image } from "../../../components/image";
import { Popup } from "../../../components/popup";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chatSettingsButton.hbs?raw";
import "./style.scss";

export class ChatSettingsButton extends Block {
  private popup: Popup;

  constructor(propsAndChildren: PropsAndChildren) {
    const icon = new Image({
      src: "/actions_dots.svg",
      alt: "Chat actions",
    });

    const button = new IconButton({
      content: icon,
      className: "chat-settings-button",
      events: {
        click: (e: Event) => this.handleButtonClick(e),
      },
    });

    const popup = new Popup({
      content: "Настройки чата",
      isVisible: false,
      position: {
        x: "right",
        y: "top",
        xValue: 0,
        yValue: 40,
      },
      events: {
        click: () => {
          popup.hide();
        },
      },
    });

    super(template, { ...propsAndChildren, button, popup }, true);
    this.popup = popup;
  }

  private handleButtonClick(e: Event) {
    e.stopPropagation();
    this.popup.toggle();

    if (this.popup.props.isVisible) {
      const closePopup = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (
          !target.closest(".popup") &&
          !target.closest(".chat-settings-button")
        ) {
          this.popup.hide();
          document.removeEventListener("click", closePopup);
        }
      };
      setTimeout(() => document.addEventListener("click", closePopup), 0);
    }
  }
}
