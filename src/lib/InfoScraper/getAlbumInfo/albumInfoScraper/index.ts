import { AlbumTrack } from "../../interfaces";
import {
    downloadMusicViaID,
    getMusicDownloadLinksViaID,
} from "../../../Downloader";

class AlbumInfoScraper {
    private album;
    constructor(public document: Document) {
        const rawData = document.querySelector("#__NEXT_DATA__")!.innerHTML;
        const data = JSON.parse(rawData);
        this.album = data.props.pageProps.media;
    }

    public getId = (): string => this.album.permlink;

    public getName = (): string => this.album.song;

    public getArtist = (): string => this.album.artist;

    public getArtwork = (): string => this.album.photo;

    public getTracks = (): AlbumTrack[] => {
        const tracks = this.album["album_tracks"] as any[];
        return this.getTracksInfo(tracks);
    };

    private getTracksInfo = (tracks: any[]): AlbumTrack[] =>
        tracks.map((track, i) => {
            const id = track.permlink;
            return {
                title: track.song,
                artist: track.artist,
                index: i + 1,
                id,
                artwork: track.photo,
                url: track.share_link,
                getDownloadLinks: () => getMusicDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadMusicViaID(id, quality),
            };
        });
}

export default AlbumInfoScraper;
