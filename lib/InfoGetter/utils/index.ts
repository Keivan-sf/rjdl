import axios from "axios";
import { JSDOM } from "jsdom";

export const getSourceCodeDOMDocument = async (url: string) => {
    const sourceCode = (await axios.get(url)).data;
    const dom = new JSDOM(sourceCode);
    return dom.window.document;
};
