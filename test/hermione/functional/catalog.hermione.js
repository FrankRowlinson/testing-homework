const baseUrl = "http://localhost:3000/hw/store";

describe("Каталог", async () => {
  it("товары в каталог приходят с нужной информацией", async ({ browser }) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(`${baseUrl}/catalog`);
    await page.waitForSelector("[data-testid]");
    const productCards = await page.$$("[data-testid]");

    for (const card of productCards) {
      const nameElement = await card.$(".card-title");
      const name = await (
        await nameElement.getProperty("textContent")
      ).jsonValue();
      expect(name).toBeTruthy();

      const priceElement = await card.$(".card-text");
      const price = await (
        await priceElement.getProperty("textContent")
      ).jsonValue();
      expect(price.slice(1)).toBeTruthy();

      const linkElement = await card.$(".card-link");
      expect(linkElement).toBeTruthy();
    }
  });
});
