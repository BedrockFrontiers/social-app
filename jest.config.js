const nextJest = require("next/jest");

/** @type {import("jest").Config} */
const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);
