import { LinkType } from "../../interfaces/urlInterfaces";
import { radioJavanLinkRegex , typeRegex } from "./regexes";

export const getRadioJavanLink = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    return matches[0];
};

export const getLinkType = (url:string): LinkType => {
    for(const type in typeRegex){
        let match = url.match(typeRegex[type]);
        if (match && match.length > 0) return LinkType[type];
    }
    throw new Error("INVALID_TYPE");
}