export enum LinkTypes {
    Music,
    Playlist,
    Album,
    PlaylistTrack,
    AlbumTrack,
    Video,
    Podcast,
    TV,
}

export type LinkTypeInString =
    | "Music"
    | "Playlist"
    | "Album"
    | "PlaylistTrack"
    | "AlbumTrack"
    | "Video"
    | "Podcast"
    | "TV";

export enum Types {
    Music,
    Playlist,
    Album,
    Video,
    Podcast,
    TV,
}

export type linkAndType = {
    link: string;
    type: LinkTypes;
};
