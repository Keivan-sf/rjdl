import { LinkTypes, linkAndType } from "../../../interfaces/urlInterfaces";
import { radioJavanLinkRegex, typeRegex } from "./regexes";

export const getRadioJavanLink = (url: string): string => {
    const matches = url.match(radioJavanLinkRegex);
    if (!matches || matches?.length < 1) throw new Error("Invalid url");
    return matches[0];
};

export const getTypeFromValidURL = (url: string): linkAndType => {
    for (const type in typeRegex) {
        let match = url.match(typeRegex[type]);
        if (match && match.length > 0) {
            let url = "https://www." + match[0];
            url = url.endsWith("/") ? url : url + "/";
            return { link: url, type: LinkTypes[type] };
        }
    }
    throw new Error("INVALID_TYPE");
};

export const getMusicNameFromURL = (url: string): string => {
    let name = url.split("/mp3s/mp3/")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("?") ? name.split("?")[0] : name;
    return name;
};

export const getVideoNameFromURL = (url: string): string => {
    let name = url.split("/videos/video/")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("?") ? name.split("?")[0] : name;
    return name;
};

export const getAlbumNameFromURL = (url: string): string => {
    let name = url.split("/mp3s/album/")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("?") ? name.split("?")[0] : name;
    return name;
};

export const getIdFromPlaylistURL = (url: string): string => {
    let name = url.split("/playlists/playlist/mp3/")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("?") ? name.split("?")[0] : name;
    return name;
};

export const getIDFromPlaylistTrackURL = (url: string): string => {
    let name = url.split("/mp3s/playlist_start?id=")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("&") ? name.split("&")[0] : name;
    return name;
};

export const getPodcastNameFromURL = (url: string): string => {
    let name = url.split("/podcasts/podcast/")[1];
    name = name.includes("/") ? name.split("/")[0] : name;
    name = name.includes("?") ? name.split("?")[0] : name;
    return name;
};
