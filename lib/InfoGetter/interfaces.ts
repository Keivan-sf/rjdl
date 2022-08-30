interface MusicAndVideoCommonInfo {
    id: string;
    title: string;
    artist: string;
    likes: number;
    plays: number;
    date: Date;
    url: string;
}
export interface MusicInfo extends MusicAndVideoCommonInfo {
    artwork: string;
    video: string | null;
}
export interface VideoInfo extends MusicAndVideoCommonInfo {
    thumbnail: string;
    song: string | null;
}
export interface PlaylistTrack {
    id: string;
    title: string;
    artist: string;
    artwork: string;
    url: string;
}
