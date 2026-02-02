import { ErrorLayout } from "../../layouts/error";
import { MainLayout } from "../../layouts/mainLayout";

export const errorPage = new MainLayout({
  className: "error-page",
  content: new ErrorLayout({
    errorTitle: "500",
    errorDescription: "Мы уже фиксим",
    errorBackLinkText: "Назад к чатам",
  }),
});
