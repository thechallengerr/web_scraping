const { Builder, By, Key, until, JavascriptExecutor, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Event = require('../app/models/Event');
const { mongooseToMultipleObjects } = require('./mongoose.js');
const Player = require('../app/models/Player');
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

async function crawlStats() {
    var data = [];
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://fifarenderz.com/22/programs');
    await driver.manage().window().maximize();

    let listEvent = await driver.wait(until.elementsLocated(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a')));
    console.log('# of Events :', listEvent.length);
    for (let i = 1; i <= listEvent.length; i++) {
        let eventName = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]/div/div[1]/div/h2`)));
        var event_slug = await eventName.getText()
        console.log(event_slug);
        event_slug = event_slug.toLowerCase().replace(/\s+/g, '') + '_22';
        const xpath = `/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[2]/a[${i}]`;
        let eventItem = await driver.wait(until.elementLocated(By.xpath(xpath)));
        driver.executeScript('arguments[0].scrollIntoView(true);', eventItem);
        await eventItem.click();
        await driver.sleep(Math.floor(Math.random() * 2000) + 8000);
        await driver.findElements(By.xpath('/html/body/div[3]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div'))
            .then(async (elms) => {
                if (elms) {
                    console.log(elms.length);
                    for (let j = 1; j <= elms.length; j++) {
                        let card = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div[4]/div[${j}]`)));
                        await card.click().then(() => console.log('clicked on card ' + j));
                        await driver.sleep(5000);
                        // get stats 
                        let background = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/div/img[1]`)));
                        let player_img = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/div/img[2]`)));
                        let event = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/div/img[3]`)));
                        let flag = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/div/img[4]`)));
                        let rating = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/span[1]`)));
                        let position = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/span[2]`))).then(async (position) => {
                            if (await position.getText() === "GK") {
                                console.log("Goal Keeper")
                                let name = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/span[3]`)));
                                await driver.executeScript("window.scrollBy(0,500)");
                                await driver.sleep(2000);
                                let full_name = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/div')));
                                let club = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[1]/div/div[1]/div[2]')));
                                let club_img = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[1]/div/div[2]/img')));
                                let league = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[2]/div/div[1]/div[2]')));
                                let league_img = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[2]/div/div[2]/img')));
                                let nation = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[3]/div/div[1]/div[2]')));

                                let diving_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/div[1]/span[2]`)));
                                // let pace_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/div[2]/span[2]`)));
                                let positioning_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[1]/span[2]`)));

                                let handling_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[1]/span[2]`)));

                                let reflexes_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[1]/span[2]`)));
                                let reflexes_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[2]/span[2]`)));

                                let kicking_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[1]/span[2]`)));
                                let kicking_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[2]/span[2]`)));

                                let physical_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[1]/span[2]`)));
                                let physical_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[2]/span[2]`)));
                                let physical_3 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[3]/span[2]`)));
                                let physical_4 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[4]/span[2]`)));
                                var player = {
                                    background: await background.getAttribute('src'),
                                    player_img: await player_img.getAttribute('src'),
                                    event: await event.getAttribute('src'),
                                    event_slug: event_slug,
                                    flag: await flag.getAttribute('src'),
                                    rating: await rating.getText(),
                                    position: await position.getText(),
                                    name: await name.getText(),
                                    full_name: await full_name.getText(),
                                    career: {
                                        club: await club.getText(),
                                        club_img: await club_img.getAttribute('src'),
                                        league: await league.getText(),
                                        league_img: await league_img.getAttribute('src'),
                                        nation: await nation.getText(),

                                    },
                                    stats: {
                                        diving_1: await diving_1.getText(),

                                        positioning_1: await positioning_1.getText(),

                                        handling_1: await handling_1.getText(),

                                        reflexes_1: await reflexes_1.getText(),
                                        reflexes_2: await reflexes_2.getText(),

                                        kicking_1: await kicking_1.getText(),
                                        kicking_2: await kicking_2.getText(),

                                        physical_1: await physical_1.getText(),
                                        physical_2: await physical_2.getText(),
                                        physical_3: await physical_3.getText(),
                                        physical_4: await physical_4.getText(),
                                    }
                                }

                                Player.countDocuments({ player_img: await player_img.getAttribute('src') }, (err, count) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (count > 0) {
                                        console.log('PLAYER ALREADY EXISTED !!!!!!!!!!!!! \n');
                                    } else {
                                        Player.create(player).then(() => {
                                            console.log('PLAYER ADDED SUCCESSULLY !!!!!!!');
                                        })
                                    }
                                })
                                await driver.executeScript("window.history.go(-1)");

                            } else {
                                let name = await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/span[3]`)));
                                await driver.executeScript("window.scrollBy(0,500)");
                                await driver.sleep(2000);
                                let full_name = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/div')));
                                let club = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[1]/div/div[1]/div[2]')));
                                let club_img = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[1]/div/div[2]/img')));
                                let league = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[2]/div/div[1]/div[2]')));
                                let league_img = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[2]/div/div[2]/img')));
                                let nation = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div/div[1]/div/div/a[3]/div/div[1]/div[2]')));
                                let pace_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/div[1]/span[2]`)));
                                let pace_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/div/div[2]/div[2]/span[2]`)));
                                let shooting_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[1]/span[2]`)));
                                let shooting_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[2]/span[2]`)));
                                let shooting_3 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[3]/span[2]`)));
                                let shooting_4 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[4]/span[2]`)));
                                let shooting_5 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[5]/span[2]`)));
                                let shooting_6 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[2]/div/div[2]/div[6]/span[2]`)));
                                let passing_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[1]/span[2]`)));
                                let passing_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[2]/span[2]`)));
                                let passing_3 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[3]/span[2]`)));
                                let passing_4 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[4]/span[2]`)));
                                let passing_5 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[5]/span[2]`)));
                                let passing_6 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[3]/div/div[2]/div[6]/span[2]`)));
                                let agility_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[1]/span[2]`)));
                                let agility_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[2]/span[2]`)));
                                let agility_3 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[3]/span[2]`)));
                                let agility_4 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[4]/span[2]`)));
                                let agility_5 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[4]/div/div[2]/div[5]/span[2]`)));
                                let defending_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[1]/span[2]`)));
                                let defending_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[2]/span[2]`)));
                                let defending_3 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[3]/span[2]`)));
                                let defending_4 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[4]/span[2]`)));
                                let defending_5 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[5]/div/div[2]/div[5]/span[2]`)));
                                let physical_1 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[1]/span[2]`)));
                                let physical_2 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[2]/span[2]`)));
                                let physical_3 = await driver.wait(until.elementLocated(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div[2]/div/div[1]/div[2]/div/div[6]/div/div[2]/div[3]/span[2]`)));
                                var player = {
                                    background: await background.getAttribute('src'),
                                    player_img: await player_img.getAttribute('src'),
                                    event: await event.getAttribute('src'),
                                    event_slug: event_slug,
                                    flag: await flag.getAttribute('src'),
                                    rating: await rating.getText(),
                                    position: await driver.wait(until.elementLocated(By.xpath(`//*[@id="fm-card-download"]/span[2]`))).getText(),
                                    name: await name.getText(),
                                    full_name: await full_name.getText(),
                                    career: {
                                        club: await club.getText(),
                                        club_img: await club_img.getAttribute('src'),
                                        league: await league.getText(),
                                        league_img: await league_img.getAttribute('src'),
                                        nation: await nation.getText(),

                                    },
                                    stats: {
                                        pace_1: await pace_1.getText(),
                                        pace_2: await pace_2.getText(),
                                        shooting_1: await shooting_1.getText(),
                                        shooting_2: await shooting_2.getText(),
                                        shooting_3: await shooting_3.getText(),
                                        shooting_4: await shooting_4.getText(),
                                        shooting_5: await shooting_5.getText(),
                                        shooting_6: await shooting_6.getText(),
                                        passing_1: await passing_1.getText(),
                                        passing_2: await passing_2.getText(),
                                        passing_3: await passing_3.getText(),
                                        passing_4: await passing_4.getText(),
                                        passing_5: await passing_5.getText(),
                                        passing_6: await passing_6.getText(),
                                        agility_1: await agility_1.getText(),
                                        agility_2: await agility_2.getText(),
                                        agility_3: await agility_3.getText(),
                                        agility_4: await agility_4.getText(),
                                        agility_5: await agility_5.getText(),
                                        defending_1: await defending_1.getText(),
                                        defending_2: await defending_2.getText(),
                                        defending_3: await defending_3.getText(),
                                        defending_4: await defending_4.getText(),
                                        defending_5: await defending_5.getText(),
                                        physical_1: await physical_1.getText(),
                                        physical_2: await physical_2.getText(),
                                        physical_3: await physical_3.getText(),
                                    }
                                }
                                // console.log(player);
                                Player.countDocuments({ player_img: await player_img.getAttribute('src') }, (err, count) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (count > 0) {
                                        console.log('PLAYER ALREADY EXISTED !!!!!!!!!!!!! \n');
                                    } else {
                                        Player.create(player).then(() => {
                                            console.log('PLAYER ADDED SUCCESSULLY !!!!!!!');
                                        })
                                    }
                                })

                                await driver.executeScript("window.history.go(-1)");
                            }
                        }
                        );


                    }

                    await driver.executeScript("window.history.go(-1)");
                    await driver.sleep(5000);
                } else {
                    await driver.executeScript("window.history.go(-1)");
                    await driver.sleep(5000);
                    i++;
                }
            });
        // console.log(await name.getText())
    }

    await driver.sleep(5000);
    await driver.quit();
}
// crawlStats();

module.exports = { crawlStats }