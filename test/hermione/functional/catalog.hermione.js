const host = "http://localhost:3000";
const baseUrl = `${host}/hw/store`;

describe("Каталог", async () => {
  it("товары в каталог приходят с нужной информацией", async ({ browser }) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(`${baseUrl}/catalog`);
    await page.waitForSelector(".card");
    const productCards = await page.$$(".card");

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

  it("ссылки на товары в каталоге ведут на страницы соответствующих товаров", async ({
    browser,
  }) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(`${baseUrl}/catalog`);
    await page.waitForSelector(".card-link");

    const productCards = await page.$$eval(".card", (cards) => {
      return cards.map((card) => {
        const name = card.querySelector(".card-title").textContent;
        const link = card.querySelector(".card-link").getAttribute("href");
        return { name, link };
      });
    });

    await page.goto(`${host}${productCards[0].link}`);
    let nameElement = await page.waitForSelector("h1", { timeout: 5000 });
    let name = await (await nameElement.getProperty("textContent")).jsonValue();
    expect(name).toBe(productCards[0].name);

    await page.goto(`${host}${productCards[1].link}`);
    nameElement = await page.waitForSelector("h1", { timeout: 5000 });
    name = await (await nameElement.getProperty("textContent")).jsonValue();
    expect(name).toBe(productCards[1].name);
  });
});
