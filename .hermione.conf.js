module.exports = {
  sets: {
    desktop: {
      files: ["test/hermione/common", "test/hermione/functional"],
      browsers: ["chromeDesktop"],
    },
    mobile: {
      files: ["test/hermione/common", "test/hermione/mobile"],
      browsers: ["chromeMobile"],
    },
  },

  browsers: {
    chromeDesktop: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      },
    },
    chromeMobile: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 575,
        height: 1080,
      },
      screenshotDelay: 1000,
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
