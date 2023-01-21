import { Track } from "../../interfaces";
import {
    downloadMusicViaID,
    getMusicDownloadLinksViaID,
} from "../../../Downloader";

class PlaylistInfoScraper {
    private playlist;
    constructor(public document: Document) {
        const rawData = document.querySelector("#__NEXT_DATA__")!.innerHTML;
        const data = JSON.parse(rawData);
        this.playlist = data.props.pageProps.playlist;
    }

    public getId = (): string => this.playlist.id;

    public getName = (): string => this.playlist.title;

    public getFollowers = (): number => this.playlist.followers;

    public getCreator = (): string => this.playlist.created_title;

    public getArtwork = (): string => this.playlist.photo;

    public getTracks = (): Track[] => {
        const tracks = this.playlist.items as any[];
        return this.getTracksInfo(tracks);
    };

    private getTracksInfo = (tracks: any[]): Track[] =>
        tracks.map((track) => {
            const id = track.permlink;
            return {
                title: track.song,
                artist: track.artist,
                id,
                artwork: track.photo,
                url: track["share_link"],
                getDownloadLinks: () => getMusicDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadMusicViaID(id, quality),
            };
        });
}

export default PlaylistInfoScraper;
