const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  this.page.waitForNavigation(30000);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given(
  "user is on booking page",
  { wrapperOptions: { retry: 1 }, timeout: 40000 },
  async function () {
    await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
      setTimeout: 30000,
    });
    await this.page.waitForSelector("h1");
  },
  50000
);

When(
  "user choice day {string}",
  { wrapperOptions: { retry: 1 }, timeout: 40000 },
  async function (string) {
    const choiceDay = `nav.page-nav > a:nth-child(${string})`; // выбор дня  от сегодня
    return await clickElement(this.page, choiceDay);
  },
  10000
);

When("user choice hall {string}", async function (string) {
  const choiceHall = `.movie-seances__time[href='#'][data-seance-id='${string}']`; // ЗалЗал90 "Сталкер"
  await clickElement(this.page, choiceHall);
  await this.page.waitForSelector(".buying__info");
});

When("user choice seat row {string} coll {string}", async function (row, coll) {
  const choiceSeat = `div:nth-child(${row}) span:nth-child(${coll})`; //ряд row место coll
  await clickElement(this.page, choiceSeat);
});

When("user click on button booking", async function () {
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees the text {string}", async function (mess) {
  const expected = mess;
  const actual = await getText(this.page, ".ticket__check-title");

  await expect(actual).to.have.string(expected);
});

Then("user sees disabled button {string}", async function (string) {
  const actual = await this.page.$eval(`${string}`, (btn) => btn.disabled);

  await expect(actual).to.be.true;
});
