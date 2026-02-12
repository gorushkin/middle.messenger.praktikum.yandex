import { IconButton } from "../../../components/iconButton";
import { Image } from "../../../components/image";
import { Popup } from "../../../components/popup";
import { Block, type PropsAndChildren } from "../../../libs/block";

import template from "./chatSettingsButton.hbs?raw";
import { ChatSettingsPopupContent } from "./chatSettingsPopupContent";
import "./style.scss";
import "./chatSettingsPopupContent.scss";

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

    const popupContent = new ChatSettingsPopupContent({});

    const popup = new Popup({
      content: popupContent,
      isVisible: false,
      position: {
        x: "right",
        y: "top",
        xValue: 0,
        yValue: 40,
      },
      events: {
        click: (e: Event) => {
          e.stopPropagation();
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
