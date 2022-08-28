import { linkAndType } from "../../interfaces/urlInterfaces";
import { getRadioJavanLink, getTypeFromValidURL } from "./getUrlType";

export const getLinkType = (url: string): linkAndType => {
    const RadioJavanURL = getRadioJavanLink(url);
    const type = getTypeFromValidURL(RadioJavanURL);
    return type;
};

export const validateURL = (url: string) => {
    try {
        const RadioJavanURL = getRadioJavanLink(url);
        getTypeFromValidURL(RadioJavanURL);
        return true;
    } catch (err) {
        return false;
    }
};
