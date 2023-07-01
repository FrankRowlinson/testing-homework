import { initPage } from "./helpers/initPage";
import { render } from "@testing-library/react";

describe("Страницы", () => {
  it("на сайте есть главная страница", () => {
    const { app } = initPage("/");
    const { queryByText } = render(app);

    const greeting = queryByText(/welcome to example store/i);

    expect(greeting).toBeTruthy();
  });

  it("на сайте есть страница -каталог-", () => {
    const { app } = initPage("/catalog");
    const { queryByRole } = render(app);

    const header = queryByRole("heading", { name: /catalog/i });

    expect(header).toBeTruthy();
  });

  it("на сайте есть страница -контакты-", () => {
    const { app } = initPage("/contacts");
    const { queryByRole } = render(app);

    const header = queryByRole("heading", { name: /contacts/i });

    expect(header).toBeTruthy();
  });

  it("на сайте есть страница -доставка-", () => {
    const { app } = initPage("/delivery");
    const { queryByRole } = render(app);

    const header = queryByRole("heading", { name: /delivery/i });

    expect(header).toBeTruthy();
  });
});
