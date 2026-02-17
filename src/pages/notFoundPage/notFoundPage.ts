import { ErrorLayout } from "../../layouts/error";
import { MainLayout } from "../../layouts/mainLayout";

export class NotFoundPageLayout extends MainLayout {
  constructor() {
    super({
      content: new ErrorLayout({
        errorTitle: "404",
        errorDescription: "Страница не найдена",
        errorBackLinkText: "Назад к чатам",
      }),
    });
  }
}
