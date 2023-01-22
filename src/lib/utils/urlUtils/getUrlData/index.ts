import { nameExtractorRegexes } from "./regexes";

export const getMusicIdFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.musicName)![0];

export const getVideoIdFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.videoName)![0];

export const getAlbumIdFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.albumName)![0];

export const getIdFromPlaylistURL = (url: string): string =>
    url.match(nameExtractorRegexes.playlistName)![0];

export const getPodcastIdFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.podcastName)![0];
