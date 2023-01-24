import { formatURL, getLinkType, validateURL } from "./utils/urlUtils";
import {
    getMusicDownloadLinksViaID,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaID,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaID,
    getVideoDownloadLinksViaURL,
    downloadMusicViaURL,
    downloadPodcastViaURL,
    downloadVideoViaURL,
    downloadMusicViaID,
    downloadPodcastViaID,
    downloadVideoViaID,
} from "./Downloader";
import { DownloadLinks } from "./Downloader/interfaces";
import {
    getMusicInfo,
    getPodcastInfo,
    getVideoInfo,
    getAlbumInfo,
    getPlaylistInfo,
    PlaylistInfo,
    AlbumInfo,
} from "./InfoScraper";
import { Music, Podcast, Video } from "./interfaces";

export {
    formatURL,
    getLinkType,
    validateURL,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
    downloadMusicViaURL,
    downloadPodcastViaURL,
    downloadVideoViaURL,
    DownloadLinks,
};
export * from "./interfaces";
export {
    AlbumInfo,
    AlbumTrack,
    MusicInfo,
    PlaylistInfo,
    PodcastInfo,
    Track,
    VideoInfo,
} from "./InfoScraper";
export { LinkType } from "./utils/urlUtils/interfaces";

/**
 * Used to get music info and provide an optimized `getDownloadLinks` function
 *
 * @example
 * const music = await Rj.getMusic("https://play.radiojavan.com/song/Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)");
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
        download: (quality?: "lq" | "hq") =>
            downloadMusicViaID(info.id, quality),
    };
};

/**
 * Used to get video info and provide an optimized `getDownloadLinks` function
 *
 * @example
 * const video = await Rj.getVideo("https://play.radiojavan.com/video/donya-bye-bye-bye");
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
        download: (quality?: "lq" | "hq") =>
            downloadVideoViaID(info.id, quality),
    };
};

/**
 * Used to get podcast info and provide an optimized `getDownloadLinks` function
 *
 * @example
 * const podcast = await Rj.getPodcast("https://play.radiojavan.com/podcast/Dance-Station-35");
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
        download: (quality?: "lq" | "hq") =>
            downloadPodcastViaID(info.id, quality),
    };
};

/**
 * Used to get album info based on its url
 *
 * @example
 * const info = await Rj.getAlbum("https://play.radiojavan.com/album/Koorosh-420")
 * console.log(info.title) // "420"
 * console.log(info.artist) // "Koorosh"
 * console.log(info.tracks) // [ AlbumTrack , ... ]
 * @param {string} url Album's url
 * @returns {Promise<AlbumInfo>}
 */
export const getAlbum = async (url: string): Promise<AlbumInfo> =>
    getAlbumInfo(url);

/**
 * Used to get playlist info based on its url
 *
 * @example
 * const info = await Rj.getPlaylist("https://play.radiojavan.com/playlist/mp3/dec52eeff468")
 * console.log(info.title) // "Acoustic"
 * console.log(info.creator) // "Radio Javan"
 * console.log(info.tracks) // [ Track , ... ]
 * @param {string} url Playlist's url
 * @returns {Promise<PlaylistInfo>}
 */
export const getPlaylist = async (url: string): Promise<PlaylistInfo> =>
    getPlaylistInfo(url);
