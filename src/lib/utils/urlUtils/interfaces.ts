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
    "PlaylistTrack",
    "Album",
    "AlbumTrack",
    "Video",
    "Podcast",
    "TV",
] as const;

export type ExtendedLinkType = typeof ExtendedLinkTypes[number];
