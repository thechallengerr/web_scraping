const { Builder, By, Capabilities, ChromiumWebDriver, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

//Chrome options
let options = new chrome.Options();
options.addArguments("--user-data-dir=C:\\Users\\Dell\\AppData\\Local\\Google\\Chrome\\User Data\\Default");


function rename(name) {
    if (name.includes('Trưởng nhóm')) {
        name = name.slice(-name.length, -12);
    }
    if (name.includes('Phó nhóm')) {
        name = name.slice(-name.length, -19);
    }
    return name;
}

function membersWriter(name, members) {


    //config csv file
    const memberWriter = createCsvWriter({
        path: `data/zalo/groups/zaloMember_${name}.csv`,
        header: [
            { id: 'memberId', title: 'memberId' },
            { id: 'memberName', title: 'memberName' },
        ]
    });

    //wwrite file
    memberWriter.writeRecords(members)
        .then(() => console.log('members data written successfully'))
        .catch(err => console.log(err))
}

async function getSpecificGroupMembers(groupName, data) {
    let driver = new Builder()
        .forBrowser('chrome')
        .build();
    //open zalo with maximum size of browser window
    await driver.get('https://chat.zalo.me');
    driver.manage().window().maximize();
    try {
        data = {};
        let members = new Array();
        // Find groups by Name
        let findXpath = '//*[@id="contact-search-input"]';
        // let inputMessageXpath = '/html/body/div/div/div[2]/main/div/article/div[4]/div[3]/div/div/div/div/div[1]';
        await driver.sleep(1000);
        let search = await driver.wait(until.elementLocated(By.xpath(findXpath)));
        await search.sendKeys(groupName);
        let groupFound = await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div[2]/nav/div[2]/div[3]/div/div[2]/div/div/div[1]/div/div[1]/div/div/div[2]')));
        await driver.sleep(8000);
        await groupFound.click();
        await driver.sleep(3000);

        // Get group display  name
        let groupNameElm = await driver.wait(until.elementLocated(By.className('title header-title')));
        groupName = await groupNameElm.getText();

        // Get group members 
        // click to show members on the right side
        let ele = await driver.wait(until.elementLocated(By.className('subtitle__groupmember__content')));
        await ele.click();

        //Find the member element
        let membersName = await driver.wait(until.elementsLocated(By.css('.chat-box-member__info__name')));
        for (let memberName of membersName) {
            let name = await memberName.getText();

            // console.log('Member :' + name);
            members.push({
                memberId: membersName.indexOf(memberName),
                memberName: rename(name)
            });
            // console.log(name);
        }

        data = {
            groupName: groupName,
            groupMembers: members,
            groupQuantity: members.length,
        }
        return data;
    } catch (errors) {
        console.error(errors);
    } finally {
        await driver.quit();
    }


}


module.exports = { getSpecificGroupMembers }

/*for (let memberName of membersName) {
            let name = await memberName.getText();

            // console.log('Member :' + name);
            members.push({
                memberId: membersName.indexOf(memberName) + 1,
                memberName: rename(name)
            });
            // console.log(name);
        }
        data = {
            groupName: groupName,
            groupMembers: members,
            groupQUantity: members.length,
        }

        const groupz = new Groupz(data);
        Groupz.findOne(data, (err, doc) => {
            if (!doc) {
                groupz.save()
                    .then(err => console.log(err));
            } else {
                console.log('Group ' + groupName + ' already exists in DB')
            }
        })
*/