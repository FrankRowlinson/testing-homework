import { render, screen, within, waitFor } from "@testing-library/react";
import { initCart } from "./helpers/initCart";
import userEvent from "@testing-library/user-event";
import { countCartTotal } from "./helpers/productUtils";
import { initForm } from "./helpers/initForm";
import "@testing-library/jest-dom/extend-expect";
import { fillSecondaryFields, getFormElements } from "./helpers/formHelpers";

const user = userEvent.setup();

describe("Проверка корзины", () => {
  it("при пустой корзине отображается ссылка на каталог", () => {
    const { app } = initCart(false);
    const { queryByRole } = render(app);

    expect(queryByRole("link", { name: "catalog" })).toBeTruthy();
  });

  it("в ссылке на корзину отображается количество уникальных товаров в корзине", () => {
    const { app } = initCart();
    render(app);

    const link = screen.getByRole("link", { name: /Cart[\d+]?/ });
    const regex = /\d+/;
    const match = link.textContent?.match(regex);
    const amount = match ? match[0] : null;

    expect(amount).toBe("6");
  });

  it("в непустой корзине есть кнопка очистки", async () => {
    const { app } = initCart();
    const { queryByRole } = render(app);

    const button = queryByRole("button", { name: "Clear shopping cart" });

    expect(button).toBeTruthy();
  });

  it("кнопка очистки корзины очищает корзину", async () => {
    const { app, cart } = initCart();
    render(app);

    let cartItems = cart.getState();

    try {
      const button = screen.getByRole("button", {
        name: "Clear shopping cart",
      });
      await user.click(button);
      cartItems = cart.getState();
    } catch (e) {}

    expect(cartItems).toEqual({});
  });

  it("в корзине отображается таблица с добавленными товарами", () => {
    const { app, cart } = initCart();
    render(app);

    const isTableFilledWithItems = () => {
      try {
        const table = screen.getByRole("table");
        const itemIds = Object.keys(cart.getState());
        itemIds.forEach((id) => {
          within(table).getByTestId(id);
        });
        return true;
      } catch (e) {
        return false;
      }
    };

    expect(isTableFilledWithItems()).toBeTruthy();
  });

  it("в корзине отражена итоговая стоимость", () => {
    const { app, cart } = initCart();
    const { queryByRole } = render(app);
    const refTotal = countCartTotal(cart.getState());

    const cellWithTotal = queryByRole("cell", { name: `$${refTotal}` });

    expect(cellWithTotal).toBeTruthy();
  });

  describe("Проверка валидации формы", () => {
    it("валидация номера телефона работает корректно", async () => {
      const WRONG_NUMBER = "abcdefg";
      const CORRECT_NUMBER = "1111111111111";

      const onSubmit = jest.fn();
      const { app } = initForm(onSubmit);
      const { getByTestId, getByRole } = render(app);

      const { nameInput, phoneInput, addressInput, submitButton } =
        getFormElements(getByRole, getByTestId);

      await fillSecondaryFields(user, nameInput, undefined, addressInput);

      await user.type(phoneInput, WRONG_NUMBER);
      await user.click(submitButton);
      expect(onSubmit).not.toBeCalled();

      await user.type(phoneInput, CORRECT_NUMBER);
      await user.click(submitButton);
      expect(onSubmit).toBeCalled();
    });
  });
});
