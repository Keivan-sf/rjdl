import { LinkType } from "./interfaces";
import { formatURL, getTypeFromValidURL } from "./getUrlType";
export * from "./getUrlData";
export { formatURL };

/**
 * Used to get url link type
 *
 * @example
 * const type = Rj.getLinkType("https://radiojavan.com/mp3s/mp3/Koorosh-Greenwich-(Ft-Salaar)")
 * console.log(type === Rj.LinkType.Music) // true
 *
 * @param {string} url
 * @returns {LinkType}
 */
export const getLinkType = (url: string): LinkType => {
    const RadioJavanURL = formatURL(url);
    const type = getTypeFromValidURL(RadioJavanURL);
    return type;
};

/**
 * Used to check whether the url is valid or not
 *
 * Only the urls which their type is recognizable are considered valid
 *
 * Recognizable types are defiled in {@link LinkType}
 *
 * @param {string} url
 * @returns {boolean}
 */
export const validateURL = (url: string) => {
    try {
        const RadioJavanURL = formatURL(url);
        getTypeFromValidURL(RadioJavanURL);
        return true;
    } catch (err) {
        return false;
    }
};
