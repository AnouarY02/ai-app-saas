module.exports = {
  roots: ["../frontend", "../backend", "../shared"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "../frontend/src/**/*.{ts,tsx}",
    "../backend/src/**/*.{ts,tsx}",
    "../shared/src/**/*.{ts,tsx}"
  ]
};
