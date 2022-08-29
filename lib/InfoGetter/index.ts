import { getMusicInfoFromDOM } from "./getMusicInfo";
import { getSourceCodeDOMDocument } from "./utils";

export const getMusicInfo = async (url: string) => {
    const document = await getSourceCodeDOMDocument(url);
    const info = getMusicInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};
