import { Config } from "jest";
const config : Config = {
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test|test.e2e).[jt]s?(x)"]
}

export default config;