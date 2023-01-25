import { Track } from "../..";
import {
    downloadMusicViaID,
    getMusicDownloadLinksViaID,
} from "../../../Downloader";
import { PageScraper } from "../../utils";

class MusicInfoScraper {
    private pageScraper: PageScraper;

    constructor(public document: Document) {
        this.pageScraper = new PageScraper(document);
    }

    public getArtist = (): string => this.pageScraper.getArtist();

    public getTitle = (): string => this.pageScraper.getTitle();

    public getLikes = (): number => this.pageScraper.getLikes();

    public getPlays = (): number => this.pageScraper.getPlays();

    public getId = (): string => this.pageScraper.getMusicID();

    public getDate = (): Date => this.pageScraper.getMusicDate();

    public getArtwork = (): string => this.pageScraper.getMusicArtwork();

    public getRelatedTracks = (): Track[] => {
        const tracks = this.pageScraper.getRelatedTracks();
        return this.getTracks(tracks);
    };

    private getTracks = (tracks: any[]): Track[] => {
        return tracks.map((track) => {
            const id = track.permlink;
            return {
                title: track.song,
                artist: track.artist,
                id,
                artwork: track.photo,
                url: track.share_link,
                getDownloadLinks: () => getMusicDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadMusicViaID(id, quality),
            };
        });
    };
}

export default MusicInfoScraper;
