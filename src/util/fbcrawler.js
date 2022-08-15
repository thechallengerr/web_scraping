const {
    Builder,
    By,
    Key,
    until,
    JavascriptExecutor,
    Capabilities,
} = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
// const options =new Chrome();

const { elementLocated } = require("selenium-webdriver/lib/until");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');
const chrome = require('selenium-webdriver/chrome')

const options = new chrome.Options();

options.addArguments(['--disable-notifications']);

let data = [];
async function fbFriendsCrawler(acc, pwd, options, data) {
    const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    driver.get("https://facebook.com");
    driver.manage().window().maximize();
    try {
        loginFacebook(acc, pwd, driver);
        console.log("Login successfully");
        //click on the overlay to close the overlay
        await sleep(5000);
        // go to profile page and get uid 
        let el = await driver.wait(until.elementLocated(By.css('li > [data-visualcompletion="ignore-dynamic"]')));
        await el.click();
        let user = '';
        let userUrl = await driver.getCurrentUrl();
        if (!userUrl.includes('https://www.facebook.com/profile.php?id=')) {

            user = userUrl.slice(25, userUrl.length);
            console.log(user);
        } else {
            user = userUrl.slice(40, userUrl.length);
            console.log(user);
        }

        //get  friends
        if (options === "friend") {
            await getFriends(driver);
        }

        //save to csv file
        writeCsv(user, data);

        return data;

    } catch (error) {
        console.error(error);
    } finally {
        await driver.close();
    }
}

async function getFriends(driver) {
    // click on Friends tab
    let showFriend = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div/div/div[3]/div/div/div/div[1]/div/div/div[1]/div/div/div/div/div/div/a[3]')));
    await showFriend.click();
    // loop until all friends found  by scrolling down
    let friendsBeforeScrolling;// friends before scrolling to compare after each scroll action
    while (true) {
        //Find element of each friend
        friendsBeforeScrolling = await driver.wait(until.elementsLocated(By.xpath('//*[@class="buofh1pr hv4rvrfc"]/div[1]/a')), 15000);

        //scroll
        await driver.executeScript('window.scrollBy(0, screen.height);');
        console.log('Scrolled');
        await sleep(Math.floor((Math.random() * 5000) + 5000));

        // Calculate the friends found again
        let friendsAfterScrolling = await driver.wait(until.elementsLocated(By.xpath('//*[@class="buofh1pr hv4rvrfc"]/div[1]/a')), 15000);
        console.log('Total before scrolling: ' + friendsBeforeScrolling.length);

        //if friendsBeforeScrolling == friendsAfterScrolling then terminate the loop
        if (friendsBeforeScrolling.length == friendsAfterScrolling.length) {

            break;
        }
    }

    // store data to array
    for (let i = 0; i < friendsBeforeScrolling.length; i++) {
        console.log((i + 1) + ', ' + await friendsBeforeScrolling[i].getText() + '\n' + await friendsBeforeScrolling[i].getAttribute('href'));
        data.push({
            index: i + 1,
            name: await friendsBeforeScrolling[i].getText(),
            link: await friendsBeforeScrolling[i].getAttribute('href'),
        });
    }
}

function writeCsv(user, data) {
    try {

        if (!fs.existsSync('E:/Projects/Selenium/data/facebook/friends')) {
            console.log("Folder does not exist. Creating... ")
            fs.mkdir('E:/Projects/Selenium/data/facebook/friends', { recursive: true }, err => { });
        }
    } catch (error) {
        console.log(error);
    }
    const csvWriter = createCsvWriter({
        path: `data/facebook/friends/fb_friends_${user}.csv`,
        header: [
            { id: "index", title: "index" },
            { id: "name", title: "name" },
            { id: "link", title: "link" },
        ],
    });

    csvWriter
        .writeRecords(data)
        .then(() => console.log("The CSV file was written successfully"));
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loginFacebook(username, password, driver) {
    await driver.findElement(By.id("email")).sendKeys(username);
    await driver.findElement(By.id("pass")).sendKeys(password, Key.ENTER);
    sleep(5000);
    //block notifications on login
    let overlay = driver.wait(until.elementLocated(By.xpath('/html/body/div[5]/div[1]/div/div[2]')));
    if (overlay) {
        console.log('Overlay already found');
    }
    await sleep(1000);
    await overlay.click();
    console.log('Overlay clicked');
}

// fbFriendsCrawler("thelight1701@gmail.com", "Hoangnd*1701", "friend").catch((err) =>
// 	console.error(err)
// );

// acount 1 : Vus2huong2001@…. Vudz2001

module.exports = { fbFriendsCrawler, data }


