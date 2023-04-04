const { Builder, By, Key, until, JavascriptExecutor, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Event = require('../app/models/Event')
const csvReader = require('csv-parser');
const fs = require('fs');
const path = require('path');
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


async function getEventsData(driver) {
    await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/section/h3/a'))).click();
}
async function getEventData() {
    var data = [];
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://fifarenderz.com/22/programs');
    await driver.manage().window().maximize();

    let listEvent = await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a')));
    console.log('# of Events :', listEvent.length);
    for (let i = 1; i <= listEvent.length; i++) {
        const xpath = `/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]/div/div[1]/div/div[1]/img`;
        let event = await driver.wait(until.elementLocated(By.xpath(xpath)));
        driver.executeScript('arguments[0].scrollIntoView(true);', event);
        var event_thumb = await event.getAttribute('src')
        // console.log("Event Thumbnail: " + event_thumb);

        let name = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]/div/div[1]/div/h2`)));
        var event_name = await name.getText()
        event_name = event_name.toLowerCase().replace(/\s+/g, '') + '_22';
        // console.log('Event Name: ' + event_name.toLowerCase().replace(/\s+/g, '') + '_22')
        // const eventItem = new Event()
        // eventItem.save()
        //     .then(() => console.log('Added ' + event_name + ' to db'))
        //     .catch(err => console.log(err));
        const eventItem = {
            event_name: await name.getText(),
            event_shortname: await name.getText(),
            event_thumb: event_thumb,
            event_slug: event_name,
        }
        data.push(eventItem)
        console.log(eventItem);
        // Event.create().then(() => console.log('Added ' + event_name + ' to db'))
        //     .catch(err => console.log(err))
    }
    try {

        if (!fs.existsSync(path.join(path.resolve(), 'data/events'))) {
            console.log(path.join(path.resolve(), 'data/events'))
            console.log("Folder does not exist. Creating... ")
            fs.mkdir(path.join(path.resolve(), 'data/events'), { recursive: true }, err => { });
        }
    } catch (error) {
        console.log(error);
    }


    csvWriter.writeRecords(data).then(() => console.log('saved successfully')).catch(err => console.log(err));
    await driver.sleep(5000);
    await driver.quit();
}

async function writeCsv(events) {


}

async function getEventPlayers() {
    var data = [];
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://fifarenderz.com/22/programs');
    await driver.manage().window().maximize();

    let listEvent = await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a')));
    console.log('# of Events :', listEvent.length);
    for (let i = 1; i <= listEvent.length; i++) {
        const xpath = `/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]/div/div[1]/div/div[1]/img`;
        let event = await driver.wait(until.elementLocated(By.xpath(xpath)));
        driver.executeScript('arguments[0].scrollIntoView(true);', event);
        var event_thumb = await event.getAttribute('src')
        // console.log("Event Thumbnail: " + event_thumb);

        let name = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]/div/div[1]/div/h2`)));
        var event_name = await name.getText()
        event_name = event_name.toLowerCase().replace(/\s+/g, '') + '_22';
        // console.log('Event Name: ' + event_name.toLowerCase().replace(/\s+/g, '') + '_22')
        // const eventItem = new Event()
        eventItem.save({
            event_name: await name.getText(),
            event_shortname: await name.getText(),
            event_thumb: event_thumb,
            event_slug: event_name,
        })
            .then(() => console.log('Added ' + event_name + ' to db'))
            .catch(err => console.log(err));
        const eventItem = {
            event_name: await name.getText(),
            event_shortname: await name.getText(),
            event_thumb: event_thumb,
            event_slug: event_name,
        }
        data.push(eventItem)
        console.log(eventItem);
        // Event.create().then(() => console.log('Added ' + event_name + ' to db'))
        //     .catch(err => console.log(err))
    }
    try {

        if (!fs.existsSync(path.join(path.resolve(), 'data/events'))) {
            console.log(path.join(path.resolve(), 'data/events'))
            console.log("Folder does not exist. Creating... ")
            fs.mkdir(path.join(path.resolve(), 'data/events'), { recursive: true }, err => { });
        }
    } catch (error) {
        console.log(error);
    }


    csvWriter.writeRecords(data).then(() => console.log('saved successfully')).catch(err => console.log(err));
    await driver.sleep(5000);
    await driver.quit();
}
getEventPlayers();