import React from "react";

import { ExampleApi } from "./../../../src/client/api";
import { Application } from "./../../../src/client/Application";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi } from "./../../../src/client/api";
import { initStore } from "../../../src/client/store";

export function initApp() {
  const api = new ExampleApi("/");
  const cart = new CartApi();
  const store = initStore(api, cart);

  const app = (
    <BrowserRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );

  return app;
}
