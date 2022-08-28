import { nameExtractorRegexes } from "./regexes";

export const getMusicNameFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.musicName)![0];

export const getVideoNameFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.videoName)![0];

export const getAlbumNameFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.albumName)![0];

export const getIdFromPlaylistURL = (url: string): string =>
    url.match(nameExtractorRegexes.playlistName)![0];

export const getIDFromPlaylistTrackURL = (url: string): string =>
    url.match(nameExtractorRegexes.playlistNameFromTrack)![0];

export const getPodcastNameFromURL = (url: string): string =>
    url.match(nameExtractorRegexes.podcastName)![0];
