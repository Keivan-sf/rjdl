import { getMusicInfoFromDOM } from "./getMusicInfo";
import { MusicInfo } from "./interfaces";
import { getSourceCodeDOMDocument } from "./utils";

export const getMusicInfo = async (url: string): Promise<MusicInfo> => {
    const document = await getSourceCodeDOMDocument(url);
    const info = getMusicInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};
