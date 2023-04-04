const { Builder, By, Key, until, JavascriptExecutor, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const League = require('../app/models/League');
const { mongooseToMultipleObjects } = require('../util/mongoose.js');

async function crawlLeagues() {
    var nationList = [];
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://fifarenderz.com/22/players');
    await driver.manage().window().maximize();
    await driver.executeScript('window.scrollBy(0,500)')
    await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[3]'))).click();
    console.log('Click dropdown league/clubs');

    await driver.sleep(1000);

    let leagues = await driver.findElements(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[3]/div[2]/div[2]/div/ul/li'));

    console.log(leagues.length);

    for (var i = 0; i < leagues.length; i++) {
        let clubList = [];
        await driver.sleep(500)
        let check = await leagues[i].findElement(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[3]/div[2]/div[2]/div/ul/li[${i + 1}]/div/div`));
        await check.click();
        let name = await leagues[i].findElement(By.className('text-xs'));
        let leagueImg = await leagues[i].findElement(By.css('img'));
        console.log(await leagueImg.getAttribute('src'));
        console.log('Show league ' + await name.getText())
        await driver.sleep(3000);

        let clubs = await driver.findElements(By.xpath(`//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[3]/div[2]/div[2]/div/ul/li[${i + 1}]/ul/li`));
        for (j = 1; j < clubs.length; j++) {
            let club_name = await clubs[j].findElement(By.className('text-xs'));
            console.log('Club: ' + await club_name.getText());
            let club_img = await clubs[j].findElement(By.css('img'));
            clubList.push({
                club_name: await club_name.getText(),
                club_img: await club_img.getAttribute('src'),
            })
        }
        console.log(clubList.join('\n '));
        await check.click();
        await driver.sleep(1000);
        // await driver.executeScript('arguments[0].scrollIntoView(true);', league);



        League.create({
            league_name: await name.getText(),
            league_img: await leagueImg.getAttribute('src'),
            clubs: clubList,
        }).then((err, doc) => {
            if (err) throw err;
            if (doc) {
                console.log('Nation ' + doc.nation + 'added successfully');
            }
        }).catch(err => { console.log(err) })
    }
}

module.exports = { crawlLeagues }