import {
    getMusicID,
    getPodcastID,
    getVideoID,
    getMusicDownloadLinksViaID,
    getVideoDownloadLinksViaID,
    getPodcastDownloadLinksViaID,
    downloadMusicViaID,
    downloadPodcastViaID,
    downloadVideoViaID,
} from "./utils";
import { DownloadLinks } from "./interfaces";
import { Readable } from "stream";

/**
 * Used to get music download links via its url
 *
 * @example
 * const links = await Rj.getMusicDownloadLinksViaURL("https://play.radiojavan.com/song/Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)")
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
 * const links = await Rj.getVideoDownloadLinksViaURL("https://play.radiojavan.com/video/donya-bye-bye-bye")
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
 * const links = await Rj.getPodcastDownloadLinksViaURL("https://play.radiojavan.com/podcast/Dance-Station-35")
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

/**
 * Used to download music via its URL
 *
 * @example
 * const readable = await Rj.downloadMusicViaURL("https://play.radiojavan.com/song/Koorosh-Un-Momento-(Ft-Raha)")
 * readable.pipe(fs.createWriteStream("Koorosh-Un-Momento.mp3"))
 *
 * @param {string} url Music's url
 * @param {"hq" | "lq"} [quality] Music quality
 * @returns {Promise<Readable>}
 */
export const downloadMusicViaURL = async (
    url: string,
    quality: "hq" | "lq" = "hq"
): Promise<Readable> => {
    const id = await getMusicID(url);
    return downloadMusicViaID(id, quality);
};

/**
 * Used to download video via its URL
 *
 * @example
 * const readable = await Rj.downloadVideoViaURL("https://play.radiojavan.com/video/gdaal-madgal-banafsh")
 * readable.pipe(fs.createWriteStream("gdaal-madgal-banafsh.mp4")
 *
 * @param {string} url Video's url
 * @param {"hq" | "lq"} [quality] Video quality
 * @returns {Promise<Readable>}
 */
export const downloadVideoViaURL = async (
    url: string,
    quality: "hq" | "lq" = "hq"
) => {
    const id = await getVideoID(url);
    return downloadVideoViaID(id, quality);
};

/**
 * Used to download podcast via its URL
 *
 * @example
 * const readable = await Rj.downloadPodcastViaURL("https://play.radiojavan.com/podcast/Abo-Atash-119")
 * readable.pipe(fs.createWriteStream("Abo-Atash-119.mp3")
 *
 * @param {string} url Podcast's url
 * @param {"hq" | "lq"} [quality] Podcast quality *Bear in mind that sometimes `lq` and `hq` qualities can be the same*
 * @returns {Promise<Readable>}
 */
export const downloadPodcastViaURL = async (
    url: string,
    quality: "hq" | "lq" = "hq"
) => {
    const id = await getPodcastID(url);
    return downloadPodcastViaID(id, quality);
};

export {
    downloadMusicViaID,
    downloadPodcastViaID,
    downloadVideoViaID,
    getMusicDownloadLinksViaID,
    getVideoDownloadLinksViaID,
    getPodcastDownloadLinksViaID,
};
