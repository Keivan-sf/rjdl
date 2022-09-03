import { Config } from "jest";
const config: Config = {
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test|test.e2e).[jt]s?(x)",
    ],
};

export default config;
