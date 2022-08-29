import { getMusicInfoFromDOM } from "./getMusicInfo";
import { getVideoInfoFromDOM } from "./getVideoInfo";
import { MusicInfo, VideoInfo } from "./interfaces";
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

export const getVideoInfo = async (url: string): Promise<VideoInfo> => {
    const document = await getSourceCodeDOMDocument(url);
    const info = getVideoInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};
