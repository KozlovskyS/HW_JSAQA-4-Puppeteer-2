const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given ("user is on booking page", async function () {
   return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
      setTimeout: 30000,
    });
  });

When("user choice day", async function () {
  // Write code here that turns the phrase above into concrete actions
  const choiceDay = ".page-nav > a:nth-child(3)"; // выбор дня - 3-й день от сегодня
  return await clickElement(this.page, choiceDay);
}, 10000);

When("user choice hall", async function () {
  // Write code here that turns the phrase above into concrete actions
  const choiceHall = ".movie-seances__time[href='#'][data-seance-id='217']"; // ЗалЗал90 "Сталкер"
  await clickElement(this.page, choiceHall);
  await this.page.waitForSelector(".buying__info");
});

When("user choice seat", async function () {
  // Write code here that turns the phrase above into concrete actions
  const choiceSeat = "div:nth-child(2) span:nth-child(6)"; //ряд 2 место 6
  await clickElement(this.page, choiceSeat);
});

When("user click on button booking", async function () {
  // Write code here that turns the phrase above into concrete actions
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees the text {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  const expected = "Вы выбрали билеты:";
  const actual = await getText(this.page, ".ticket__check-title");

  await expect(actual).toContain(expected);
});
