import { Link } from "../../components/link";
import { ErrorLayout } from "../../layouts/error";
import { MainLayout } from "../../layouts/mainLayout";

export const notFoundPage = new MainLayout({
  content: new ErrorLayout({
    errorTitle: "404",
    errorDescription: "Страница не найдена",
    errorBackLinkText: new Link("/chat", "Назад к чатам", "error__link"),
  }),
});
