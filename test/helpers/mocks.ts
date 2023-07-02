import { ExampleApi } from "../../src/client/api";
import {
  CartState,
  CheckoutFormData,
  Product,
  ProductShortInfo,
} from "../../src/common/types";
import { getExampleProducts } from "./productUtils";

export class MockCartApi {
  state: CartState;

  constructor(cart: CartState) {
    this.state = cart;
  }

  getState(): CartState {
    return this.state;
  }

  setState(cart: CartState) {
    this.state = { ...cart };
  }
}

export class MockExampleApi extends ExampleApi {
  products: Product[];

  constructor(basename: string) {
    super(basename);
    this.products = getExampleProducts();
  }

  async getProducts(): Promise<any> {
    const shortInfoProducts: ProductShortInfo[] = this.products.map(
      (product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    );
    return await Promise.resolve({ data: shortInfoProducts });
  }

  async getProductById(id: number): Promise<any> {
    const product: Product = this.products.filter(
      (product) => product.id === id
    )[0];
    return await Promise.resolve({ data: product });
  }

  async checkout(form: CheckoutFormData, cart: CartState): Promise<any> {
    return await Promise.resolve({ data: { id: 1 } });
  }
}
