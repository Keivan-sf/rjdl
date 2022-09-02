import { ExtendedLinkTypes, ExtendedLinkType, LinkType } from "../interfaces";
import { radioJavanLinkRegex, typeRegexes } from "./regexes";

export const formatURL = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    const standardURL = [
        "https://",
        matches[0].split("radiojavan.com")[1],
    ].join("radiojavan.com");
    return standardURL;
};

export const getTypeFromValidURL = (url: string): LinkType => {
    for (let type of ExtendedLinkTypes) {
        const match = url.match(typeRegexes[type]);
        if (match) return LinkType[simplifyLinkType(type)];
    }
    throw new Error("INVALID_TYPE");
};

function simplifyLinkType(type: ExtendedLinkType) {
    return type === "AlbumTrack" || type === "PlaylistTrack" ? "Music" : type;
}
