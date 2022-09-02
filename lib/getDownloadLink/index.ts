import { getMusicHost, getPodcastHost, getVideoHost } from "./getHost";
import { DownloadLinks } from "./interfaces";

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