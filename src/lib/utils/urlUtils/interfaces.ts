/**
 * Music links enum
 * @readonly
 * @enum
 * @prop {0} Music Music type
 * @prop {1} Playlist Playlist type
 * @prop {2} Album Album type
 * @prop {3} Video Video type
 * @prop {4} Podcast Podcast type
 * @prop {5} TV TV type
 */
export enum LinkType {
    Music,
    Playlist,
    Album,
    Video,
    Podcast,
    TV,
}

export const ExtendedLinkTypes = [
    "Music",
    "Playlist",
    "Album",
    "Video",
    "Podcast",
    "TV",
    "APPMusic",
    "APPVideo",
    "APPPodcast",
    "APPPlaylist",
    "APPAlbum",
] as const;

export type ExtendedLinkType = typeof ExtendedLinkTypes[number];

export const complexToSimpleTypes: { [key in ExtendedLinkType]: LinkType } = {
    Music: LinkType.Music,
    APPMusic: LinkType.Music,
    Podcast: LinkType.Podcast,
    APPPodcast: LinkType.Podcast,
    Video: LinkType.Video,
    APPVideo: LinkType.Video,
    Playlist: LinkType.Playlist,
    APPPlaylist: LinkType.Playlist,
    Album: LinkType.Album,
    APPAlbum: LinkType.Album,
    TV: LinkType.TV,
};
