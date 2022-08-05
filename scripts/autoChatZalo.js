const { Builder, By, Capabilities, ChromiumWebDriver, Key, until } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
var webdriver = require('selenium-webdriver');

async function autoChatZalo(phoneNumbers, chatContent) {
    let driver = new Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .forBrowser('chrome')
        .build()
        ;
    //open zalo with maximum size of browser window
    await driver.get('https://chat.zalo.me');
    driver.manage().window().maximize();
    await driver.sleep(5000);
    try {
        let logs = [];
        let findXpath = '//*[@id="contact-search-input"]';
        let inputMessageXpath = '/html/body/div/div/div[2]/main/div/article/div[4]/div[3]/div/div/div/div/div[1]';
        let search = await driver.wait(until.elementLocated(By.xpath(findXpath)));
        for (let phoneNumber of phoneNumbers) {

            // await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/nav/div[2]/div[3]/div/div[2]/div/div/div[1]/div/div[1]/div/div/div[2]')));
            await driver.sleep(2000);
            await search.sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE));
            await driver.sleep(3000);
            await search.sendKeys(phoneNumber);
            await driver.sleep(10000);
            let conv = await driver.findElements(By.className('conv-item-title__name'));
            if (conv.length > 0) {

                console.log('Conversation with ' + await driver.wait(until.elementLocated(By.className('conv-item-title__name')), 5000).getText() + ' opened');
                await search.sendKeys(Key.ENTER);
                for (let content of chatContent) {
                    await driver.sleep(Math.floor(Math.random() * 2000));
                    let inputMessage = await driver.wait(until.elementLocated(By.id('richInput')));

                    await inputMessage.click();
                    console.log('Sent:  ' + content);
                    // await driver.wait(inputMessage.getAttribute('contenteditable') === 'true');
                    await inputMessage.sendKeys(content);
                    await driver.sleep(2000);
                    await driver.wait(until.elementLocated(By.xpath('//*[@id="chatInputv2"]/div/div/div[2]/div[5]'))).click();
                    await driver.sleep(2000);
                    // sleep(2000);
                }
            } else {
                console.log('No contact found for phone number: ' + phoneNumber);
                continue;
            }
        }


    } catch (error) {
        console.log(error);
    } finally {
        await driver.close();

    }
}

var testChat = ['Trấn tuấn mãi đỉnh', "Trấn tuấn mãi đỉnh :))", 'Trấn tuấn mãi đỉnh', 'Trấn tuấn mãi đỉnh?', 'Trấn tuấn mãi đỉnh?', 'Yes, I do'];
// autoChatZalo('0818320988', testChat).catch(function (err) { console.error(err); });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { autoChatZalo }