const baseUrl = "http://localhost:3000/hw/store";
// извини за полчище данных, которые можно было бы вынести в отдельный файл
// так и не разобрался с ошибками импорта модулей для .js гермионы
const singleProduct = {
  id: 30,
  name: "puppy",
  price: 150,
  color: "brown",
  material: "soft leather",
};

const productList = [
  {
    id: 30,
    name: "puppy",
    price: 150,
    color: "brown",
    material: "soft leather",
  },
  {
    id: 31,
    name: "kitty",
    price: 200,
    color: "white",
    material: "plastic",
  },
  {
    id: 32,
    name: "froggy",
    price: 110,
    color: "green",
    material: "extremely luxurious fabric",
  },
  {
    id: 33,
    name: "ducky",
    price: 50,
    color: "yellow",
    material: "rubber",
  },
  {
    id: 34,
    name: "snakey",
    price: 230,
    color: "light black",
    material: "red hot chili peppers",
  },
  {
    id: 35,
    name: "zebraey",
    price: 400,
    color: "you know",
    material: "paper towels",
  },
];

describe("Каталог", async () => {
  it("Верстка страницы товара", async ({ browser }) => {
    const productMock = await browser.mock(`${baseUrl}/api/products/30`, {
      method: "get",
    });
    productMock.respond({
      id: 30,
      name: "puppy",
      price: 150,
      color: "brown",
      material: "soft leather",
    });

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(`${baseUrl}/catalog/30`);

    await page.waitForSelector(".btn.btn-primary");
    await browser.assertView("plain", "body");
  });

  it("Верстка каталога", async ({ browser }) => {
    const productsMock = await browser.mock(`${baseUrl}/api/products`, {
      method: "get",
    });
    productsMock.respond(productList);

    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(`${baseUrl}/catalog`);

    await page.waitForSelector(".card-body");
    await browser.assertView("plain", "body");
  });
});
