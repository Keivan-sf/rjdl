import { LinkTypes, linkAndType } from "../../../interfaces/urlInterfaces";
import { radioJavanLinkRegex, typeRegex } from "./regexes";

export const getRadioJavanLink = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    return matches[0];
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
