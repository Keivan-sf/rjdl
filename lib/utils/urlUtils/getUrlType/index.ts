import { LinkTypes, LinkTypeInString } from "../interfaces";
import { radioJavanLinkRegex, typeRegex } from "./regexes";

export const formatURL = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    const standardURL = [
        "https://",
        matches[0].split("radiojavan.com")[1],
    ].join("radiojavan.com");
    return standardURL;
};

export const getTypeFromValidURL = (url: string): LinkTypes => {
    for (const type in typeRegex) {
        const linkType = type as LinkTypeInString;
        let match = url.match(typeRegex[linkType]);
        if (match && match.length > 0) return LinkTypes[linkType];
    }
    throw new Error("INVALID_TYPE");
};
