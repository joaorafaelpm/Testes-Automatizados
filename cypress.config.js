const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs-extra");
const path = require("path");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

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
  e2e: {
    async setupNodeEvents(on, config) {
      // Create a bundler using esbuild. This is faster than webpack and is used to package the test files.
      // The createEsbuildPlugin handles the conversion of .feature files into JavaScript that Cypress can run.
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      // Register the bundler as the file preprocessor. Cypress calls this whenever it needs to prepare a file for the browser.
      on("file:preprocessor", bundler);
      // Initialize the Cucumber plugin. This sets up the necessary event listeners for Cucumber to work,
      // such as generating JSON reports and handling step definitions.
      await addCucumberPreprocessorPlugin(on, config);
      
      // With this configuration, you can specify a custom configuration file by adding a "configFile" in a environment variable when running Cypress, for example: "npx cypress open --env configFile=staging" to use the "staging.json" configuration file located in the "cypress/config" directory. If no custom configuration file is specified or found, it will default to an empty configuration object.
      const file = config.env.configFile || "";

      const configJson = await getConfigurationByFile(file);
      return { ...config, ...configJson };
    },
    // By using the following command you can record your tests in the Cypress Dashboard and have access to all the features that it provides, such as video recording, screenshots, test results, etc.
    // But for that work you need to add the line "projectId" with your cypress dashboard project id to work, and also you need to run the command "npx cypress run --record --key your-cypress-dashboard-record-key" to record your tests in the Cypress Dashboard
    // npx cypress run --record --key 788adb10-f6c6-4207-b1e8-68762272c7bf
    specPattern: "cypress/e2e/**/*.{js,feature}",
    // excludeSpecPattern: "cypress/e2e/other/*.js",
    chromeWebSecurity: false,
    projectId: "1vvroh",
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
    retries: {
      runMode: 0,
      openMode: 1,
    },
    env: {
      first_name: "Sarah",
      webdriveruni_url: "http://www.webdriveruniversity.com",
      access_token: process.env.ACCESS_TOKEN
    },
  },
});
