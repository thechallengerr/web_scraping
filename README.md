# Crawler app : Craw data from facebook and zalo using Selenium ![Selenium](/src/img/selenium-seeklogo.com.svg)

## **How to use**

### **1. Install NodeJS**
- Download `NodeJs` from [NodeJS Website]( https://nodejs.org/en/download/) 
- Install **NodeJS**
  - Once the installer finishes downloading, launch it. Open the **downloads** link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch.
  -  The system will ask if you want to run the software – click **Run**.
  -  You will be welcomed to the Node.js Setup Wizard – click **Next**.
  -  On the next screen, review the license agreement. Click **Next** if you agree to the terms and install the software.
  -  The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click **Next**.
  -   The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking **Next**.
  -   Finally, click the **Install** button to run the installer. When it finishes, click **Finish**.
- Verify installation of `NodeJS` and `npm`

```javascript
node -v
```
```javascript
npm -v
```
### **2. Install Selenium**
  - Install Selenium library using `npm`:
  ```javascript
  npm i selenium-webdriver
  ```
  - Download browser driver (Chromium/Chrome, IE, Firefox,Microsoft Edge, ...). In this case, we use Chrome driver
    - Go to [Chrome Driver download page](https://chromedriver.chromium.org/downloads) and download the lastest version of Chrome
    - Save it to `C:/Users/Selenium/bin` or any folder you want . Remeber the its path
    - Add Selenium to system variable `Path`
      1. On the Windows taskbar, right-click the **Windows** icon and select **System**.
      2. Click on **Advanced system settings** ,  then open the **Environment Variables** window.
      3. In this window, find the System variable section , in the list of variables, look for variable named `Path`. Choose **Edit**
      4. New window promts. Copy the path to the ChromeDriver downloaded previously, then click on **New** , and paste it here.
      5. Click on **Ok** to save. Click on **Ok** again in the **Environment Variables** window , and once again in the **System Properties** window to finish
    - Test if chromedriver has been added 
    ```javascript
    chromedriver.exe
    ```
      - If `Path` is configured correctly, you will see some output relating to the startup of the driver 
      ```
      Starting ChromeDriver 103.0.5060.53 (a1711811edd74ff1cf2150f36ffa3b0dae40b17f-refs/branch-heads/5060@{#853}) on port 9515 
      Only local connections are allowed.Please see https://chromedriver.chromium.org/security-considerations for suggestions on keeping ChromeDriver safe.
      ChromeDriver was started successfully.
      ```
### **3. Start using the app**

- Clone repo from git 
```javascript
git clone <repo_link>
```

- Go to folder VSS_bot_emotion

- Open terminal/cmd here and run the command to install `node_modules`:

```javascript 
npm install
```

- Start server using node 
```javascript 
npm start
```

- Open browser and go to `https://localhost:8888`

