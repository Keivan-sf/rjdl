import { getMusicHost, getPodcastHost, getVideoHost } from "./getHost";
import { getMusicID, getPodcastID, getVideoID } from "./getId";
import { DownloadLinks } from "./interfaces";

export const getMusicDownloadLinksViaURL = async (
    url: string
): Promise<DownloadLinks> => {
    const id = await getMusicID(url);
    return getMusicDownloadLinksViaID(id);
};

export const getVideoDownloadLinksViaURL = (
    url: string
): Promise<DownloadLinks> => {
    const id = getVideoID(url);
    return getVideoDownloadLinksViaID(id);
};

export const getPodcastDownloadLinksViaURL = (
    url: string
): Promise<DownloadLinks> => {
    const id = getPodcastID(url);
    return getPodcastDownloadLinksViaID(id);
};

export const getMusicDownloadLinksViaID = async (
    id: string
): Promise<DownloadLinks> => {
    const host = await getMusicHost(id);
    return {
        midQuality: `${host}/media/mp3/mp3-256/${id}.mp3`,
        highQuality: `${host}/media/mp3/mp3-320/${id}.mp3`,
    };
};

export const getPodcastDownloadLinksViaID = async (
    id: string
): Promise<DownloadLinks> => {
    const host = await getPodcastHost(id);
    return {
        midQuality: `${host}/media/podcast/mp3-256/${id}.mp3`,
        highQuality: `${host}/media/podcast/mp3-320/${id}.mp3`,
    };
};

export const getVideoDownloadLinksViaID = async (
    id: string
): Promise<DownloadLinks> => {
    const host = await getVideoHost(id);
    return {
        midQuality: `${host}/media/music_video/lq/${id}.mp4`,
        highQuality: `${host}/media/music_video/hq/${id}.mp4`,
    };
};
