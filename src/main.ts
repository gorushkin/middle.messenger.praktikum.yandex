import "./libs/handlebarsHelpers";
import { router } from "./libs/";
import { ChatPageLayout } from "./pages/chats";
import { ErrorPageLayout } from "./pages/errorPage";
import { LoginPageLayout } from "./pages/loginPage";
import { NotFoundPageLayout } from "./pages/notFoundPage";
import { ProfileEditDataPageLayout } from "./pages/profileEditDataPage";
import { ProfileEditPasswordPageLayout } from "./pages/profileEditPasswordPage";
import { ProfilePageLayout } from "./pages/profilePage";
import { SignUpPageLayout } from "./pages/signUpPage";
import "./style.scss";

export const AppRoutes = {
  Root: "/",
  SignUp: "/sign-up",
  Messenger: "/messenger",
  Settings: "/settings",
  SettingsEditData: "/settings/edit-data",
  SettingsEditPassword: "/settings/edit-password",
  Error404: "/404",
  Error500: "/500",
  Login: "/login",
  Any: "/*",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

router
  .setRootQuery("app")
  .use(AppRoutes.Root, LoginPageLayout)
  .use(AppRoutes.Login, LoginPageLayout)
  .use(AppRoutes.SignUp, SignUpPageLayout)
  .use(AppRoutes.Messenger, ChatPageLayout)
  .use(AppRoutes.Settings, ProfilePageLayout)
  .use(AppRoutes.SettingsEditData, ProfileEditDataPageLayout)
  .use(AppRoutes.SettingsEditPassword, ProfileEditPasswordPageLayout)
  .use(AppRoutes.Error500, ErrorPageLayout)
  .use(AppRoutes.Error404, NotFoundPageLayout)
  .use(AppRoutes.Any, NotFoundPageLayout)
  .start();
