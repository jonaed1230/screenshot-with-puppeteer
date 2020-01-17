const puppeteer = require("puppeteer");
const prompt = require("prompt");

// start the prompt

prompt.start();

// we're using async/await - so we need an async function, that we can run
const run = async () => {
  // open the browser and prepare a page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  prompt.get(["url"], async function(err, result) {
    if (err) console.log(err);
    // set the size of the viewport, so our screenshot will have the desired size
    await page.setViewport({
      width: 1280,
      height: 800
    });
    await page.goto(result.url);
    const title = await page.title();
    await page.screenshot({
      path: `./images/${title}.png`,
      fullPage: true
    });

    // close the browser
    await browser.close();
  });
};

// run the async function
run();
