const { Builder, By, Key, until, JavascriptExecutor, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Event = require('../app/models/Event');
const { mongooseToMultipleObjects } = require('../util/mongoose.js');

const Card = require('../app/models/Card')
const csvReader = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: `data//events/event.csv`,
    header: [
        { id: "event_name", title: "event_name" },
        { id: "event_shortname", title: "event_shortname" },
        { id: "event_thumb", title: "event_thumb" },
        { id: "event_slug", title: "event_slug" },
    ],
});

async function getEventPlayers() {
    var data = [];
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://fifarenderz.com/22/programs');
    await driver.manage().window().maximize();

    let listEvent = await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a')));
    console.log('# of Events :', listEvent.length);
    for (let i = 1; i <= listEvent.length; i++) {
        let name = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]/div/div[1]/div/h2`)));
        var event_slug = await name.getText()
        console.log(event_slug);
        event_slug = event_slug.toLowerCase().replace(/\s+/g, '') + '_22';
        const xpath = `/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]`;
        let eventItem = await driver.wait(until.elementLocated(By.xpath(xpath)));
        driver.executeScript('arguments[0].scrollIntoView(true);', eventItem);
        await eventItem.click();
        await driver.sleep(Math.floor(Math.random() * 2000) + 8000);
        let numOfCards = await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div')))
        // console.log(await name.getText());

        if (numOfCards.length < 1) {
            await driver.executeScript("window.history.go(-1)");
            await driver.sleep(5000);
            continue;
        }
        console.log(numOfCards.length);
        for (let j = 1; j <= numOfCards.length; j++) {
            let card = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]`)));
            await card.click().then(() => console.log('clicked on card'))
            // var playerImg = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/div/img[2]`)));
            // var playerName = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/span[3]`)));
            // var rating = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/span[1]`)));
            // var pos = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/span[2]`)));
            // var flag = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/div/img[4]`)));
            // var background = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/div/img[1]`)));
            // var event = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]/a/div/div[1]/div/div/div/div/img[3]`)));
            // var cardItem = {
            //     player_img: await playerImg.getAttribute('src'),
            //     player_name: await playerName.getText(),
            //     rating: await rating.getText(),
            //     pos: await pos.getText(),
            //     flag: await flag.getAttribute('src'),
            //     background: await background.getAttribute('src'),
            //     event: await event.getAttribute('src'),
            //     event_slug: event_slug,
            // }
            // console.log(cardItem)
            // Card.find({ player_img: await playerImg.getAttribute('src') }).then((err, doc) => {
            //     if (err) console.log(err)

            //     console.log("duplicate: \n", doc)
            // if (doc.length < 1) {
            //     Card.create(cardItem)
            //         .then(() => console.log(cardItem))
            //         .catch(err => console.error(err));
            // } else if (doc.length > 1) {
            //     Card.deleteMany({ player_img: await playerImg.getAttribute('src') }).then((doc) => console.log("delete duplicates :" + doc.deletedCount))
            //     Card.create(cardItem)
            //         .then(() => console.log(cardItem))
            //         .catch(err => console.error(err));
            // }
            // })
            await driver.executeScript("window.history.go(-1)");
            await driver.sleep(5000);
        }

        // Card.deleteMany({ player_img: /gfycat/, }).then((docs) => { console.log(docs) })
        // Card.deleteMany({ event: /gfycat/ }).then((docs) => { console.log(docs) })
        // Card.deleteMany({ flag: /gfycat/, }).then((docs) => { console.log(docs) })
        await driver.executeScript("window.history.go(-1)");
        await driver.sleep(5000);


    }

    await driver.sleep(5000);
    await driver.quit();
}
// getEventPlayers();

module.exports = { getEventPlayers }