import { initCatalog } from "../helpers/initCatalog";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getExampleProduct } from "../helpers/productUtils";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Страница товара", () => {
  it("товар добавленный в корзину имеет подпись об этом", async () => {
    const { app } = initCatalog(true, true);
    render(app);

    await waitFor(() =>
      expect(screen.getByText(/item in cart/i)).toBeInTheDocument()
    );
  });

  it("повторное добавление в корзину увеличивает количество товара в корзине", async () => {
    const { app, cart } = initCatalog(true, true);
    render(app);

    const refProduct = getExampleProduct(3);

    await waitFor(() =>
      expect(screen.getByText(refProduct.name)).toBeInTheDocument()
    );

    const button = screen.queryByRole("button", { name: /add to cart/i });
    const refCount = cart.getState()[3].count;
    await user.click(button!);
    expect(cart.getState()[3].count - 1).toBe(refCount);
  });
});
