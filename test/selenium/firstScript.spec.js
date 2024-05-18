const { By, Builder, Browser } = require("selenium-webdriver");
const assert = require("assert");

try {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
} catch (error) {
  console.log(error.message);
}
