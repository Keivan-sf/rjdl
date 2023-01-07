import {
    getMusicID,
    getPodcastID,
    getVideoID,
    getMusicDownloadLinksViaID,
    getVideoDownloadLinksViaID,
    getPodcastDownloadLinksViaID,
} from "./utils";
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
export {
    getMusicDownloadLinksViaID,
    getVideoDownloadLinksViaID,
    getPodcastDownloadLinksViaID,
};
