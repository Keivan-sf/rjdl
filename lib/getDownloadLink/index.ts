import { getMusicHost, getPodcastHost } from "./getHost";
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
