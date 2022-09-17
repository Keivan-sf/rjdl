import { formatURL, getLinkType, validateURL } from "./utils/urlUtils";
import {
    getMusicDownloadLinksViaID,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaID,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaID,
    getVideoDownloadLinksViaURL,
} from "./Downloader";
import { DownloadLinks } from "./Downloader/interfaces";
import { getMusicInfo, getPodcastInfo, getVideoInfo } from "./InfoScraper";
import { Music, Podcast, Video } from "./interfaces";

export {
    formatURL,
    getLinkType,
    validateURL,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
    DownloadLinks,
};
export * from "./interfaces";
export * from "./InfoScraper";
export { LinkType } from "./utils/urlUtils/interfaces";

/**
 * Used to get music info and provide an optimized `getDownloadLinks` function
 *
 * This method is the right choice when you want the music info and might want to
 * download the music later on. The reason is in some cases in order to download
 * the media we need the info first. And `getDownloadLinks` function provided here
 * will be able to simply skip that part
 *
 * @example
 * const music = await Rj.getMusic("https://radiojavan.com/mp3s/mp3/Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)");
 * console.log(music.title); // Yebaram Man
 *
 * const downloadLinks = await music.getDownloadLinks();
 * console.log(downloadLinks.midQuality) // mid quality download link (256)
 *
 * @param {string} url
 * @returns {Promise<Music>}
 */
export const getMusic = async (url: string): Promise<Music> => {
    const info = await getMusicInfo(url);
    return {
        ...info,
        getDownloadLinks: () => getMusicDownloadLinksViaID(info.id),
    };
};

/**
 * Used to get video info and provide an optimized `getDownloadLinks` function
 *
 * This method is the right choice when you want the video info and might want to
 * download the video later on. The reason is in some cases in order to download
 * the media we need the info first. And `getDownloadLinks` function provided here
 * will be able to simply skip that part
 *
 * @example
 * const video = await Rj.getVideo("https://radiojavan.com/videos/video/donya-bye-bye-bye");
 * console.log(video.title); // Bye Bye Bye
 *
 * const downloadLinks = await video.getDownloadLinks();
 * console.log(downloadLinks.midQuality) // mid quality download link
 *
 * @param {string} url
 * @returns {Promise<Video>}
 */
export const getVideo = async (url: string): Promise<Video> => {
    const info = await getVideoInfo(url);
    return {
        ...info,
        getDownloadLinks: () => getVideoDownloadLinksViaID(info.id),
    };
};

/**
 * Used to get podcast info and provide an optimized `getDownloadLinks` function
 *
 * This method is the right choice when you want the podcast info and might want to
 * download the podcast later on. The reason is in some cases in order to download
 * the media we need the info first. And `getDownloadLinks` function provided here
 * will be able to simply skip that part
 *
 * @example
 * const podcast = await Rj.getPodcast("https://radiojavan.com/podcasts/podcast/Dance-Station-35");
 * console.log(podcast.title); // Dance Station 35
 *
 * const downloadLinks = await podcast.getDownloadLinks();
 * console.log(downloadLinks.midQuality) // mid quality download link (192)
 *
 * @param {string} url
 * @returns {Promise<Podcast>}
 */
export const getPodcast = async (url: string): Promise<Podcast> => {
    const info = await getPodcastInfo(url);
    return {
        ...info,
        getDownloadLinks: () => getPodcastDownloadLinksViaID(info.id),
    };
};
