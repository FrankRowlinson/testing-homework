const baseUrl = "http://localhost:3000/hw/store";

describe("Контакты", async () => {
  it("Верстка страницы", async ({ browser }) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(`${baseUrl}/contacts`);

    await page.waitForSelector("h1");
    await browser.assertView("plain", "body");
  });
});
