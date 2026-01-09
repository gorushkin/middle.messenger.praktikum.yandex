import "./style.scss";
import { TextSPALink } from "../../components/textSPALink/textSPALink";
import { Block } from "../../libs/block";
import { routesConfig } from "../../router";

import rootPageTemplate from "./rootPage.hbs?raw";

class RootPage extends Block {
  constructor() {
    super(
      {
        routes: routesConfig.map(
          (route) => new TextSPALink(route.path, route.title)
        ),
      },
      true,
      rootPageTemplate
    );
  }
}

export const rootPage = new RootPage();
