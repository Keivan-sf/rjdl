import { LinkTypes } from "../../../interfaces/urlInterfaces";
import { radioJavanLinkRegex, typeRegex } from "./regexes";

type linkType = {
    link: string;
    type: LinkTypes;
};

export const getRadioJavanLink = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    return matches[0];
};

export const getLinkType = (url: string): linkType => {
    for (const type in typeRegex) {
        let match = url.match(typeRegex[type]);
        if (match && match.length > 0)
            return { link: "https://www." + match[0], type: LinkTypes[type] };
    }
    throw new Error("INVALID_TYPE");
};

export const getMusicNameFromURL = (url: string): string => {
    let name = url.split("/mp3s/mp3/")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("?") ? name.split("?")[0] : name;
    return name;
};
