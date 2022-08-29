import { LinkTypes, linkAndType } from "../interfaces";
import { radioJavanLinkRegex, typeRegex } from "./regexes";

export const getRadioJavanLink = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    const standardURL = [
        "https://",
        matches[0].split("radiojavan.com")[1],
    ].join("radiojavan.com");
    return standardURL;
};

export const getTypeFromValidURL = (url: string): linkAndType => {
    for (const type in typeRegex) {
        let match = url.match(typeRegex[type]);
        if (match && match.length > 0) {
            let url = "https://www." + match[0];
            url = url.endsWith("/") ? url : url + "/";
            return { link: url, type: LinkTypes[type] };
        }
    }
    throw new Error("INVALID_TYPE");
};
