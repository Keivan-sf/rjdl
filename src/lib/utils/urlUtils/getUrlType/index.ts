import {
    ExtendedLinkTypes,
    ExtendedLinkType,
    LinkType,
    complexToSimpleTypes,
} from "../interfaces";
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
    const origin = url.includes("radiojavan") ? "radiojavan.com" : "rj.app";
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    const standardURL = ["https://", matches[0].split(origin)[1]].join(origin);
    return standardURL;
};

export const getTypeFromValidURL = (url: string): LinkType => {
    for (const type of ExtendedLinkTypes) {
        const match = url.match(typeRegexes[type]);
        if (match) return simplifyLinkType(type);
    }
    throw new Error("INVALID_TYPE");
};

function simplifyLinkType(type: ExtendedLinkType): LinkType {
    const simpleType = complexToSimpleTypes[type];
    return simpleType;
}

export const getExtendedTypeFromValidURL = (url: string): ExtendedLinkType => {
    for (const type of ExtendedLinkTypes) {
        const match = url.match(typeRegexes[type]);
        if (match) return type;
    }
    throw new Error("INVALID_TYPE");
};
