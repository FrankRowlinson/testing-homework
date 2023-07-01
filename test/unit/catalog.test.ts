import { initCatalog } from "../helpers/initCatalog";
import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MOCK_PRODUCT_IDS, getExampleProduct } from "../helpers/productUtils";

describe("Каталог", () => {
  it("отображаются нужные поля в карточках товаров (название, цена, ссылка)", async () => {
    const { app } = initCatalog(false);
    render(app);

    await waitFor(() => expect(screen.getByTestId(1)).toBeInTheDocument());

    const cards = MOCK_PRODUCT_IDS.map((id) => {
      return { id, card: screen.getByTestId(id) };
    });

    cards.forEach(({ id, card }) => {
      const product = getExampleProduct(id);
      expect(
        within(card).queryByRole("link", { name: /details/i })
      ).toBeTruthy();
      expect(within(card).queryByText(`$${product.price}`)).toBeTruthy();
      expect(within(card).queryByText(product.name)).toBeTruthy();
    });
  });

  it("добавленные в корзину товары подписаны соответственно", async () => {
    const { app } = initCatalog();
    render(app);

    await waitFor(() =>
      expect(screen.getAllByText(/item in cart/i)).toHaveLength(6)
    );
  });
});
