import { ErrorLayout } from "../../layouts/error";
import { MainLayout } from "../../layouts/mainLayout";

export class ErrorPageLayout extends MainLayout {
  constructor() {
    super({
      className: "error-page",
      content: new ErrorLayout({
        errorTitle: "500",
        errorDescription: "Мы уже фиксим",
        errorBackLinkText: "Назад к чатам",
      }),
    });
  }
}
