import { LinkType } from "../../interfaces/urlInterfaces";
import { radioJavanLinkRegex , mp3LinkRegex } from "./regexes";

export const getRadioJavanLink = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    return matches[0];
};

export const getLinkType = (url:string): LinkType => {
    const matches = url.match(mp3LinkRegex);
    if (matches && matches.length > 0) return LinkType.Music;
    throw new Error("INVALID_TYPE");
}