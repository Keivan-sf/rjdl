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
