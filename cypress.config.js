const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // By using the following command you can record your tests in the Cypress Dashboard and have access to all the features that it provides, such as video recording, screenshots, test results, etc.
    // But for that work you need to add the line "projectId" with your cypress dashboard project id to work, and also you need to run the command "npx cypress run --record --key your-cypress-dashboard-record-key" to record your tests in the Cypress Dashboard
    // npx cypress run --record --key 788adb10-f6c6-4207-b1e8-68762272c7bf
    projectId: "1vvroh",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    // excludeSpecPattern: "cypress/e2e/other/*.js",
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
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
    env: {
      first_name: "Sarah",
      webdriveruni_url: "http://www.webdriveruniversity.com",
    },
  },
});
