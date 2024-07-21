const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://192.168.80.13:5173',
    env: {
      BACKEND: "http://localhost:3001/api"
    },
  },
});
