const { defineConfig } = require("cypress");

const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`);

  // If a specific environment configuration file is not found, return an empty object
  if(!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {};
  }

  // If the configuration file exists, read and return its contents as a JSON object
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  projectId: "1vvroh",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // With this configuration, you can specify a custom configuration file by adding a "configFile" in a environment variable when running Cypress, for example: "npx cypress open --env configFile=staging" to use the "staging.json" configuration file located in the "cypress/config" directory. If no custom configuration file is specified or found, it will default to an empty configuration object.
      const file = config.env.configFile || '';

      return getConfigurationByFile(file);
    },
    // By using the following command you can record your tests in the Cypress Dashboard and have access to all the features that it provides, such as video recording, screenshots, test results, etc.
    // But for that work you need to add the line "projectId" with your cypress dashboard project id to work, and also you need to run the command "npx cypress run --record --key your-cypress-dashboard-record-key" to record your tests in the Cypress Dashboard
    // npx cypress run --record --key 788adb10-f6c6-4207-b1e8-68762272c7bf
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    // excludeSpecPattern: "cypress/e2e/other/*.js",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    baseUrl: "http://www.webdriveruniversity.com/",
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: true,
    // videoCompression: 15,

    // This is a good way to test the application as a mobile device
    // viewportHeight: 750,
    // viewportWidth: 550,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json",
    },
    retries : {
      runMode: 0 ,
      openMode: 1
    },
    env: {
      first_name: "Sarah",
      webdriveruni_url: "http://www.webdriveruniversity.com",
    },
  },
});
