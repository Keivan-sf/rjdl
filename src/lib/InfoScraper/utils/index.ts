import axios from "axios";
import { JSDOM } from "jsdom";
export * from "./trackScraper";
export * from "./PageScraper";
export const getSourceCodeDOMDocument = async (url: string) => {
    const sourceCode = (await axios.get(url)).data;
    const dom = new JSDOM(sourceCode);
    return dom.window.document;
};
