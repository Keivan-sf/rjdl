import { Readable } from "stream";
import { DownloadLinks } from "../interfaces";
import { getMusicHost, getPodcastHost, getVideoHost } from "./getHost";
import { getReadableStreamFromUrl } from "./getStreamFromUrl";

export * from "./getHost";
export * from "./getId";
export * from "./getStreamFromUrl";

export const downloadMusicViaID = async (
    id: string,
    quality: "hq" | "lq" = "hq"
): Promise<Readable> => {
    const { highQuality, midQuality } = await getMusicDownloadLinksViaID(id);
    const downloadLink = quality === "lq" ? midQuality : highQuality;
    return getReadableStreamFromUrl(downloadLink);
};

export const downloadVideoViaID = async (
    id: string,
    quality: "hq" | "lq" = "hq"
): Promise<Readable> => {
    const { highQuality, midQuality } = await getVideoDownloadLinksViaID(id);
    const downloadLink = quality === "lq" ? midQuality : highQuality;
    return getReadableStreamFromUrl(downloadLink);
};

export const downloadPodcastViaID = async (
    id: string,
    quality: "hq" | "lq" = "hq"
): Promise<Readable> => {
    const { highQuality, midQuality } = await getPodcastDownloadLinksViaID(id);
    const downloadLink = quality === "lq" ? midQuality : highQuality;
    return getReadableStreamFromUrl(downloadLink);
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
        midQuality: `${host}/media/podcast/mp3-192/${id}.mp3`,
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
