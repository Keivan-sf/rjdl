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

/**
 * Used to get music info based on its url
 *
 * @example
 * const info = await Rj.getMusicInfo("https://radiojavan.com/mp3s/mp3/Sogand-Tehran")
 * console.log(info.title) // "Tehran"
 * console.log(info.artist) // "Sogand"
 * @param {string} url Music's url
 * @returns {Promise<MusicInfo>}
 */
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

/**
 * Used to get video info based on its url
 *
 * @example
 * const info = await Rj.getVideoInfo("https://radiojavan.com/videos/video/siavash-ghomayshi-barax")
 * console.log(info.title) // "Barax"
 * console.log(info.artist) // "Siavash Ghomayshi"
 * @param {string} url Video's url
 * @returns {Promise<VideoInfo>}
 */
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

/**
 * Used to get playlist info based on its url
 *
 * @example
 * const info = await Rj.getPlaylistInfo("https://radiojavan.com/playlists/playlist/mp3/dec52eeff468")
 * console.log(info.title) // "Acoustic"
 * console.log(info.creator) // "Radio Javan"
 * console.log(info.tracks) // [ Track , ... ]
 * @param {string} url Playlist's url
 * @returns {Promise<PlaylistInfo>}
 */
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

/**
 * Used to get album info based on its url
 *
 * @example
 * const info = await Rj.getAlbumInfo("https://radiojavan.com/mp3s/album/Koorosh-420")
 * console.log(info.title) // "420"
 * console.log(info.artist) // "Koorosh"
 * console.log(info.tracks) // [ AlbumTrack , ... ]
 * @param {string} url Album's url
 * @returns {Promise<AlbumInfo>}
 */
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

/**
 * Used to get podcast info based on its url
 *
 * @example
 * const info = await Rj.getPodcastInfo("https://radiojavan.com/podcasts/podcast/Mohsens-House-99")
 * console.log(info.title) // "Mohsen's House 99"
 * console.log(info.artist) // "DJ Mohsen"
 * @param {string} url Podcast's url
 * @returns {Promise<PodcastInfo>}
 */
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
