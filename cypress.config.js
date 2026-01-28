const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
import "dotenv/config";

module.exports = defineConfig({
  e2e: {
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      config.env.API_LOGIN_URL = process.env.API_LOGIN_URL;
      config.env.TEST_USERNAME = process.env.TEST_USERNAME;
      config.env.TEST_PASSWORD = process.env.TEST_PASSWORD;
      config.env.API_LOGIN_URL = process.env.API_LOGIN_URL;
      config.env.TEST_CLIENT_ID = process.env.TEST_CLIENT_ID;
      config.env.TEST_CLIENT_SECRET = process.env.TEST_CLIENT_SECRET;
      config.env.CODE_VERIFIER = process.env.CODE_VERIFIER;
      return config;
    },

    specPattern: "cypress/e2e/step_definitions/*.feature",
  },
});
