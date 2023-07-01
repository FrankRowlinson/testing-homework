const baseUrl = "http://localhost:3000/hw/store";

describe("Навигационный заголовок", () => {
  it("меню открывается по нажатию на гамбургер и закрывается по нажатию на пункт меню", async ({
    browser,
  }) => {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(baseUrl);
    const burger = await page.waitForSelector(".navbar-toggler");

    await burger.click();

    await browser.assertView("open", ".navbar");

    const link = await page.waitForSelector(".nav-link");
    await link.click();

    await browser.assertView("closed", ".navbar");
  });
});
