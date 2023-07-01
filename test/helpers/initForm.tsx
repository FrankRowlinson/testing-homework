import React from "react";

import { ExampleApi } from "../../src/client/api";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";
import { getPremadeCart } from "./productUtils";
import { MockCartApi } from "./mocks";
import { Form } from "../../src/client/components/Form";

export function initForm(onSubmit: jest.Mock<any, any>) {
  const api = new ExampleApi("/");
  const cart = new MockCartApi(getPremadeCart());
  const store = initStore(api, cart);

  const app = (
    <Provider store={store}>
      <Form onSubmit={onSubmit} />
    </Provider>
  );

  return { app };
}
