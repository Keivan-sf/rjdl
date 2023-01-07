import { Readable } from "stream";
import { getMusicHost, getPodcastHost, getVideoHost } from "./getHost";
import { getMusicID, getPodcastID, getVideoID } from "./getId";
import { getReadableStreamFromUrl } from "./getStreamFromUrl";
import { DownloadLinks } from "./interfaces";

/**
 * Used to get music download links via its url
 *
 * @example
 * const links = await Rj.getMusicDownloadLinksViaURL("https://radiojavan.com/mp3s/mp3/Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)")
 *
 * // mid quality download link (256)
 * console.log(links.midQuality)
 *
 * // high quality download link (320)
 * console.log(links.highQuality)
 * @param {string} url Music's url
 * @returns {Promise<DownloadLinks>}
 */
export const getMusicDownloadLinksViaURL = async (
    url: string
): Promise<DownloadLinks> => {
    const id = await getMusicID(url);
    return getMusicDownloadLinksViaID(id);
};

/**
 * Used to get video download links via its url
 *
 * @example
 * const links = await Rj.getVideoDownloadLinksViaURL("https://radiojavan.com/videos/video/donya-bye-bye-bye")
 *
 * // mid quality download link
 * console.log(links.midQuality)
 *
 * // high quality download link
 * console.log(links.highQuality)
 * @param {string} url Video's url
 * @returns {Promise<DownloadLinks>}
 */
export const getVideoDownloadLinksViaURL = async (
    url: string
): Promise<DownloadLinks> => {
    const id = await getVideoID(url);
    return getVideoDownloadLinksViaID(id);
};

/**
 * Used to get podcast download links via its url
 *
 * *Bear in mind that sometimes mid and high qualities can be the same*
 *
 * @example
 * const links = await Rj.getPodcastDownloadLinksViaURL("https://radiojavan.com/podcasts/podcast/Dance-Station-35")
 *
 * // mid quality download link (192)
 * console.log(links.midQuality)
 *
 * // high quality download link (320)
 * console.log(links.highQuality)
 * @param {string} url Podcast's url
 * @returns {Promise<DownloadLinks>}
 */
export const getPodcastDownloadLinksViaURL = async (
    url: string
): Promise<DownloadLinks> => {
    const id = await getPodcastID(url);
    return getPodcastDownloadLinksViaID(id);
};

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
