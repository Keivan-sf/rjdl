import { getMusicInfo, getPodcastInfo, getVideoInfo } from "../../../";
import {
    getMusicIdFromURL,
    getPodcastIdFromURL,
    getVideoIdFromURL,
} from "../../../utils/urlUtils";
import { getExtendedTypeFromValidURL } from "../../../utils/urlUtils/getUrlType";
import { ExtendedLinkType } from "../../../utils/urlUtils/interfaces";

export const getMusicID = async (url: string): Promise<string> => {
    const type = getExtendedTypeFromValidURL(url);
    throwOnNonMusicTypes(type);
    if (type === "Music") return getMusicIdFromURL(url);
    return (await getMusicInfo(url)).id;
};

export const getVideoID = async (url: string): Promise<string> => {
    const type = getExtendedTypeFromValidURL(url);
    throwOnNonVideoTypes(type);
    if (type === "Video") return getVideoIdFromURL(url);
    return (await getVideoInfo(url)).id;
};

export const getPodcastID = async (url: string): Promise<string> => {
    const type = getExtendedTypeFromValidURL(url);
    throwOnNonPodcastTypes(type);
    if (type === "Podcast") return getPodcastIdFromURL(url);
    return (await getPodcastInfo(url)).id;
};

function throwOnNonMusicTypes(type: ExtendedLinkType) {
    const allowedTypes: ExtendedLinkType[] = [
        "PlaylistTrack",
        "AlbumTrack",
        "Music",
        "APPMusic",
    ];
    if (!allowedTypes.includes(type)) throw new Error("NOT_A_MUSIC_LINK");
}

function throwOnNonVideoTypes(type: ExtendedLinkType) {
    const allowedTypes: ExtendedLinkType[] = ["Video", "APPVideo"];
    if (!allowedTypes.includes(type)) throw new Error("NOT_A_VIDEO_LINK");
}

function throwOnNonPodcastTypes(type: ExtendedLinkType) {
    const allowedTypes: ExtendedLinkType[] = ["Podcast", "APPPodcast"];
    if (!allowedTypes.includes(type)) throw new Error("NOT_A_PODCAST_LINK");
}
