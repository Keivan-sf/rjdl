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
