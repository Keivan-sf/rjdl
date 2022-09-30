import { ExtendedLinkType } from "../../interfaces";

export const radioJavanLinkRegex =
    /^(https:\/\/|http:\/\/)?(www\.)?(radiojavan\.com|rj\.app)\/.*/g;

export const typeRegexes: { [key in ExtendedLinkType]: RegExp } = {
    Music: /radiojavan\.com\/mp3s\/mp3\/[^\/]+[\/]?$/g,
    Video: /radiojavan\.com\/videos\/video\/[^\/]+[\/]?$/g,
    Album: /radiojavan\.com\/mp3s\/album\/[^\/\?]+(?!\?index)[\/]?$/gm,
    AlbumTrack: /radiojavan\.com\/mp3s\/album\/[^\/]+\/?index=[0-9]+[\/]?$/g,
    Podcast: /radiojavan\.com\/podcasts\/podcast\/[^\/]+[\/]?$/g,
    Playlist: /radiojavan\.com\/playlists\/playlist\/mp3\/[^\/]+[\/]?$/g,
    PlaylistTrack: /radiojavan\.com\/mp3s\/playlist_start\?id=[^\/]+[\/]?$/g,
    TV: /radiojavan\.com\/tv$/g,
    APPMusic: /rj\.app\/m\/[^\/]+[\/]?$/g,
    APPVideo: /rj\.app\/v\/[^\/]+[\/]?$/g,
    APPAlbum: /rj\.app\/ma\/[^\/]+[\/]?$/g,
    APPPlaylist: /rj\.app\/pm\/[^\/]+[\/]?$/g,
    APPPodcast: /rj\.app\/p\/[^\/]+[\/]?$/g,
};
