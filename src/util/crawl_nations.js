const { Builder, By, Key, until, JavascriptExecutor, logging } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const Nation = require('../app/models/Nation');
const { mongooseToMultipleObjects } = require('../util/mongoose.js');

async function crawlNations() {
    var nationList = [];
    let driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://fifarenderz.com/22/players');
    await driver.manage().window().maximize();
    await driver.executeScript('window.scrollBy(0,500)')
    await driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div/div/div/div[3]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[4]/div[1]/div/div[1]'))).click();
    console.log('Click dropdown nation')
    let showAll = await driver.wait(until.elementLocated(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[4]/div[2]/div[2]/div/ul/li[16]/button')))
    // await driver.executeScript('arguments[0].scrollIntoView(true);', showAll);
    await driver.sleep(1000);

    await showAll.click();
    console.log('Show All clicked');


    await driver.sleep(1000);

    let nations = await driver.findElements(By.xpath('//*[@id="content-area"]/div[5]/div/div/div[3]/div[2]/div[1]/div/div/div[1]/div[2]/div[1]/div/div[5]/div[4]/div[2]/div[2]/div/ul/li'))
    console.log(nations.length);

    nations.forEach(async (nation) => {
        await driver.executeScript('arguments[0].scrollIntoView(true);', nation);
        let name = await nation.findElement(By.className('text-xs'));
        let flag = await nation.findElement(By.css('img'));
        Nation.create({
            nation: await name.getText(),
            flag: await flag.getAttribute('src')
        }).then((err, doc) => {
            if (err) throw err;
            if (doc) {
                console.log('Nation ' + doc.nation + 'added successfully');
            }
        }).catch(err => { console.log(err) })
    })
}

module.exports = { crawlNations }