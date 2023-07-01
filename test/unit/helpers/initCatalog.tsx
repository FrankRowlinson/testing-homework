import React from "react";

import { Application } from "./../../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../../src/client/store";
import { MockCartApi, MockExampleApi } from "./mocks";
import { getPremadeCart } from "./productUtils";

export function initCatalog(
  prefilled: boolean = true,
  detailPage: boolean = false
) {
  const api = new MockExampleApi("/");
  const premadeCart = prefilled ? getPremadeCart() : {};
  const cart = new MockCartApi(premadeCart);
  const store = initStore(api, cart);

  const app = (
    <MemoryRouter initialEntries={[`/catalog${detailPage ? "/3" : ""}`]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return { app, cart };
}
