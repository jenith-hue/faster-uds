module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { tsconfig: "tsconfig.jest.json", diagnostics: false },
    ],
  },
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    "\\.(css)$": "identity-obj-proxy"
  },
  testMatch: ["<rootDir>/src/**/*.test.ts?(x)"],
};
