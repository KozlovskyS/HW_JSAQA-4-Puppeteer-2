const { clickElement, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(10000);
  await page.setDefaultTimeout(10000);
}, 30000);

afterEach(() => {
  page.close();
});

describe("GoToCinema tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await page.waitForSelector("h1");
  });

  test("Successful standart ticket booking", async () => {
    const choiceDay = ".page-nav > a:nth-child(3)"; // выбор дня - 3-й день от сегодня
    const choiceHall = ".movie-seances__time[href='#'][data-seance-id='217']"; // ЗалЗал90 "Сталкер"
    const choiceSeat = "div:nth-child(3) span:nth-child(6)"; //ряд 3 место 6
    await clickElement(page, choiceDay);
    await clickElement(page, choiceHall);
    await page.waitForSelector(".buying__info");
    await clickElement(page, choiceSeat);
    await clickElement(page, ".acceptin-button");

    const expected = "Вы выбрали билеты:";
    const actual = await getText(page, ".ticket__check-title");

    await expect(actual).toContain(expected);
  }, 30000);

  test("Successful get QR-code for standart ticket booking", async () => {
    const choiceDay = ".page-nav > a:nth-child(5)"; // выбор дня - 5-й день от сегодня
    const choiceHall = ".movie-seances__time[href='#'][data-seance-id='217']"; // ЗалЗал90 "Сталкер"
    const choiceSeat = "div:nth-child(4) span:nth-child(2)"; //ряд 4 место 2
    await clickElement(page, choiceDay);
    await clickElement(page, choiceHall);
    await page.waitForSelector(".buying__info");
    await clickElement(page, choiceSeat);
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    await clickElement(page, ".acceptin-button");

    const expected = "Электронный билет";
    const actual = await getText(page, ".ticket__check-title");

    await expect(actual).toContain(expected);
  }, 30000);

  test("Successful VIP ticket booking", async () => {
    const choiceDay = ".page-nav > a:nth-child(3)"; // выбор дня - 3-й день от сегодня
    const choiceHall = ".movie-seances__time[href='#'][data-seance-id='199']"; // ЗалЗал90 "Сталкер"
    const choiceSeat = "div:nth-child(4) span:nth-child(6)"; //ряд 3 место 6
    await clickElement(page, choiceDay);
    await clickElement(page, choiceHall);
    await page.waitForSelector(".buying__info");
    await clickElement(page, choiceSeat);
    await clickElement(page, ".acceptin-button");

    const expected = "Вы выбрали билеты:";
    const actual = await getText(page, ".ticket__check-title");

    await expect(actual).toContain(expected);
  }, 40000);

  test("Sade path - Booking a reserved ticket", async () => {
    const choiceDay = ".page-nav > a:nth-child(5)"; // выбор дня - 5-й день от сегодня
    const choiceHall = ".movie-seances__time[href='#'][data-seance-id='217']"; // ЗалЗал90 "Сталкер"
    const choiceSeat = "div:nth-child(4) span:nth-child(2)"; //ряд 4 место 2
    await clickElement(page, choiceDay);
    await clickElement(page, choiceHall);
    await page.waitForSelector(".buying__info");
    await clickElement(page, choiceSeat);

    const expected = true;
    const actual = await page.$eval(".acceptin-button", (btn) => btn.disabled);
    console.log(actual);

    await expect(actual).toBe(expected);
  }, 30000);
});
