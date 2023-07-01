import React from "react";

import { Application } from "../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { MockCartApi, MockExampleApi } from "./mocks";

export function initPage(route: string) {
  const api = new MockExampleApi("/");
  const cart = new MockCartApi({});
  const store = initStore(api, cart);

  const app = (
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return { app };
}
