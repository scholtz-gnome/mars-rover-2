export default {
  testEnvironment: "node",
  preset: "ts-jest",
  testRegex: "(/dist/tests/.*|(\\.|/)(spec))\\.[t]s?$",
  verbose: true,
  coveragePathIgnorePatterns: [".*spec\\.ts"],
  collectCoverageFrom: ["./src/**/*.(t|j)s"],
  coverageDirectory: "coverage",
};
