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

export enum Types {
    Music,
    Playlist,
    Album,
    Video,
    Podcast,
    TV,
}

export type linkType = {
    link: string;
    type: LinkTypes;
};
