import { render, screen } from "@testing-library/react";
import { initApp } from "../helpers/initApp";

const basename: string = "/";

const routes: string[] = ["delivery", "contacts", "catalog", "cart"].map(
  (route) => basename + route
);

describe("Проверка хедера и ссылок", () => {
  it("Название магазина это ссылка на главную", () => {
    const app = initApp();
    render(app);
    const logo = screen.getByTestId("logo");
    expect(logo.getAttribute("href")).toBe(basename);
  });

  it("Хедер содержит ссылки на страницы магазина и корзину", () => {
    const app = initApp();
    render(app);
    const links = screen.getAllByTestId("nav-link");

    for (let route of routes) {
      expect(links.map((link) => link.getAttribute("href"))).toContain(route);
    }
  });
});
