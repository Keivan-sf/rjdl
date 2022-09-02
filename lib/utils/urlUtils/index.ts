import { LinkTypes } from "./interfaces";
import { formatURL, getTypeFromValidURL } from "./getUrlType";
export * from "./getUrlData";

export const getLinkType = (url: string): LinkTypes => {
    const RadioJavanURL = formatURL(url);
    const type = getTypeFromValidURL(RadioJavanURL);
    return type;
};

export const validateURL = (url: string) => {
    try {
        const RadioJavanURL = formatURL(url);
        getTypeFromValidURL(RadioJavanURL);
        return true;
    } catch (err) {
        return false;
    }
};
