import axios from "axios";
import { JSDOM } from "jsdom";
import { headersInputType } from "../interfaces";
export * from "./PageScraper";

let requestHeaders:unknown = {
    "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
}


export function getRequestHeaders() {
    return requestHeaders
}

/**
 * Used to set custom headers for requests
 *
 * @example
 * setRequestHeaders({
 *      "user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
 *      "Authorization":"token"
 * })
 * @param {headersInputType} headers
 */
export function setRequestHeaders(headers:headersInputType) {
    requestHeaders = headers
}


export const getSourceCodeDOMDocument = async (url: string) => {
    const headers = getRequestHeaders()
    const sourceCode = (
        await axios.get(url, {
            method: "GET",
            headers: headers,
        })
    ).data;
    const dom = new JSDOM(sourceCode);
    return dom.window.document;
};
