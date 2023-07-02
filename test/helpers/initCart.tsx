import React, { useEffect } from "react";
import { ExampleApi } from "../../src/client/api";
import { Application } from "../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { checkoutComplete, initStore } from "../../src/client/store";
import { getPremadeCart } from "./productUtils";
import { MockCartApi } from "./mocks";

export function initCart(
  prefilled: boolean = true,
  orderCompleted: boolean = false
) {
  const api = new ExampleApi("/");
  const premadeCart = prefilled ? getPremadeCart() : {};
  const cart = new MockCartApi(premadeCart);
  const store = initStore(api, cart);

  const app = (
    <MemoryRouter initialEntries={["/cart"]}>
      <Provider store={store}>
        {orderCompleted && <OrderInitiator />}
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return { app, cart };
}

const OrderInitiator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkoutComplete(1));
  }, []);

  return <span></span>;
};
