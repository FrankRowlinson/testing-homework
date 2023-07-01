import React from "react";

import { ExampleApi } from "../../src/client/api";
import { Application } from "../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { getPremadeCart } from "./productUtils";
import { MockCartApi } from "./mocks";

export function initCart(prefilled: boolean = true) {
  const api = new ExampleApi("/");
  const premadeCart = prefilled ? getPremadeCart() : {};
  const cart = new MockCartApi(premadeCart);
  const store = initStore(api, cart);

  const app = (
    <MemoryRouter initialEntries={["/cart"]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return { app, cart };
}
