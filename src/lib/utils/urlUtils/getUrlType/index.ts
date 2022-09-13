import { ExtendedLinkTypes, ExtendedLinkType, LinkType } from "../interfaces";
import { radioJavanLinkRegex, typeRegexes } from "./regexes";

/**
 * Used to format a radio javan url into a standard form
 *
 * @example
 * const formatted = Rj.formatURL("www.radiojavan.com/mp3s");
 * console.log(formatted) // https://radiojavan.com/mp3s
 * @param {string} url
 * @returns {string} Formatted url
 */
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
    for (const type of ExtendedLinkTypes) {
        const match = url.match(typeRegexes[type]);
        if (match) return LinkType[simplifyLinkType(type)];
    }
    throw new Error("INVALID_TYPE");
};

function simplifyLinkType(type: ExtendedLinkType) {
    return type === "AlbumTrack" || type === "PlaylistTrack" ? "Music" : type;
}

export const getExtendedTypeFromValidURL = (url: string): ExtendedLinkType => {
    for (const type of ExtendedLinkTypes) {
        const match = url.match(typeRegexes[type]);
        if (match) return type;
    }
    throw new Error("INVALID_TYPE");
};
