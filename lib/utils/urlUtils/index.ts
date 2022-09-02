import { LinkType } from "./interfaces";
import { formatURL, getTypeFromValidURL } from "./getUrlType";
export * from "./getUrlData";
export { formatURL };

export const getLinkType = (url: string): LinkType => {
    const RadioJavanURL = formatURL(url);
    let type = getTypeFromValidURL(RadioJavanURL);
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
