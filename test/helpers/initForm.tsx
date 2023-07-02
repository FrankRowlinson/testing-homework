import React, { useCallback } from "react";

import { ExampleApi } from "../../src/client/api";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ApplicationState, checkout, initStore } from "../../src/client/store";
import { getPremadeCart } from "./productUtils";
import { MockCartApi, MockExampleApi } from "./mocks";
import { Form } from "../../src/client/components/Form";
import { CheckoutFormData } from "../../src/common/types";

function MockForm() {
  const cart = useSelector((s: ApplicationState) => s.cart);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (form: CheckoutFormData) => {
      dispatch(checkout(form, cart));
    },
    [dispatch, cart]
  );

  const EXAMPLE_NUMBER = "111111111111";
  const EXAMPLE_ADDRESS = "ddddddddddddd";
  const EXAMPLE_NAME = "Volodya";

  return (
    <button
      data-testid='submit'
      onClick={() =>
        onSubmit({
          name: EXAMPLE_NAME,
          phone: EXAMPLE_NUMBER,
          address: EXAMPLE_ADDRESS,
        })
      }
    >
      Checkout
    </button>
  );
}

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

export function initMockForm() {
  const api = new MockExampleApi("/");
  const cart = new MockCartApi(getPremadeCart());
  const store = initStore(api, cart);

  const app = (
    <Provider store={store}>
      <MockForm />
    </Provider>
  );

  return { app, cart, store };
}
