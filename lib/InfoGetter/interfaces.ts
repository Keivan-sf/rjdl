interface MusicAndVideoCommonInfo {
    title: string;
    artist: string;
    likes: number;
    plays: number;
    date: Date;
    url: string;
}
export interface MusicInfo extends MusicAndVideoCommonInfo {
    artwork: string;
}
export interface VideoInfo extends MusicAndVideoCommonInfo {}
