import { CartState, Product } from "../../../src/common/types";

export const MOCK_PRODUCT_IDS = new Array(6)
  .fill(0)
  .map((_, index) => index + 1);

export function getExampleProduct(id: number) {
  return {
    id: id,
    name: `item${id}`,
    price: 100 * id,
    description: `${id} item description`,
    material: `${id} material`,
    color: `${id} color`,
  };
}

export function getExampleProducts(): Product[] {
  const products = MOCK_PRODUCT_IDS.map((id) => {
    return getExampleProduct(id);
  });

  return products;
}

export function getPremadeCart() {
  const products = getExampleProducts().concat(getExampleProducts());
  const cart: CartState = {};

  products.forEach((product) => {
    const { id, name, price } = product;

    if (!cart[id]) {
      cart[id] = { name, count: 0, price };
    }
    cart[id].count++;
  });

  return cart;
}

export function countCartTotal(cart: CartState) {
  let total = 0;
  for (let id in cart) {
    total += cart[id].count * cart[id].price;
  }

  return total;
}
