import { formatURL } from "../utils/urlUtils";
import { getMusicInfoFromDOM } from "./getMusicInfo";
import { getVideoInfoFromDOM } from "./getVideoInfo";
import { getAlbumInfoFromDOM } from "./getAlbumInfo";
import { getPlaylistInfoFromDOM } from "./getPlaylistInfo";
import { getPodcastInfoFromDOM } from "./getPodcastInfo";
import {
    AlbumInfo,
    MusicInfo,
    PlaylistInfo,
    PodcastInfo,
    VideoInfo,
} from "./interfaces";
import { getSourceCodeDOMDocument } from "./utils";

export const getMusicInfo = async (url: string): Promise<MusicInfo> => {
    url = formatURL(url);
    const document = await getSourceCodeDOMDocument(url);
    const info = getMusicInfoFromDOM(document);
    const infoAndUrl: MusicInfo = {
        ...info,
        url,
    };
    return infoAndUrl;
};

export const getVideoInfo = async (url: string): Promise<VideoInfo> => {
    url = formatURL(url);
    const document = await getSourceCodeDOMDocument(url);
    const info = getVideoInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};

export const getPlaylistInfo = async (url: string): Promise<PlaylistInfo> => {
    url = formatURL(url);
    const document = await getSourceCodeDOMDocument(url);
    const info = getPlaylistInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};

export const getAlbumInfo = async (url: string): Promise<AlbumInfo> => {
    url = formatURL(url);
    const document = await getSourceCodeDOMDocument(url);
    const info = getAlbumInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};

export const getPodcastInfo = async (url: string): Promise<PodcastInfo> => {
    url = formatURL(url);
    const document = await getSourceCodeDOMDocument(url);
    const info = getPodcastInfoFromDOM(document);
    const infoAndUrl = {
        ...info,
        url,
    };
    return infoAndUrl;
};

export * from "./interfaces";
