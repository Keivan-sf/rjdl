import { getMusicInfo } from "../../InfoGetter";
import { getMusicIdFromURL, getVideoIdFromURL } from "../../utils/urlUtils";
import { getExtendedTypeFromValidURL } from "../../utils/urlUtils/getUrlType";
import { ExtendedLinkType } from "../../utils/urlUtils/interfaces";

export const getMusicID = async (url: string): Promise<string> => {
    const type = getExtendedTypeFromValidURL(url);
    throwOnNonMusicTypes(type);
    if (type === "Music") return getMusicIdFromURL(url);
    return (await getMusicInfo(url)).id;
};

export const getVideoID = (url: string): string => {
    const type = getExtendedTypeFromValidURL(url);
    throwOnNonVideoTypes(type);
    return getVideoIdFromURL(url);
};

function throwOnNonMusicTypes(type: ExtendedLinkType) {
    const allowedTypes: ExtendedLinkType[] = [
        "PlaylistTrack",
        "AlbumTrack",
        "Music",
    ];
    if (!allowedTypes.includes(type)) throw new Error("NOT_A_MUSIC_LINK");
}

function throwOnNonVideoTypes(type: ExtendedLinkType) {
    if (type !== "Video") throw new Error("NOT_A_VIDEO_LINK");
}
