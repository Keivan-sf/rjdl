import axios from "axios";
import { JSDOM } from "jsdom";
export * from "./PageScraper";
export const getSourceCodeDOMDocument = async (url: string) => {
    const sourceCode = (
        await axios.get(url, {
            method: "GET",
            headers: {
                "user-agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
            },
        })
    ).data;
    const dom = new JSDOM(sourceCode);
    return dom.window.document;
};
