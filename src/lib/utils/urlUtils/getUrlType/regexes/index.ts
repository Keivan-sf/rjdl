import { ExtendedLinkType } from "../../interfaces";

export const radioJavanLinkRegex =
    /^(https:\/\/|http:\/\/)?(www\.)?(play\.radiojavan\.com|rj\.app)\/.*/g;

export const typeRegexes: { [key in ExtendedLinkType]: RegExp } = {
    Music: /play\.radiojavan\.com\/song\/[^\/]+[\/]?$/g,
    Video: /play\.radiojavan\.com\/video\/[^\/]+[\/]?$/g,
    Album: /play\.radiojavan\.com\/album\/[^\/]+[\/]?$/g,
    Podcast: /play\.radiojavan\.com\/podcast\/[^\/]+[\/]?$/g,
    Playlist: /play\.radiojavan\.com\/playlist\/mp3\/[^\/]+[\/]?$/g,
    TV: /play\.radiojavan\.com\/tv[\/]?$/g,
    APPMusic: /rj\.app\/m\/[^\/]+[\/]?$/g,
    APPVideo: /rj\.app\/v\/[^\/]+[\/]?$/g,
    APPAlbum: /rj\.app\/ma\/[^\/]+[\/]?$/g,
    APPPlaylist: /rj\.app\/pm\/[^\/]+[\/]?$/g,
    APPPodcast: /rj\.app\/p\/[^\/]+[\/]?$/g,
};
