import { Track } from "../..";
import {
    downloadVideoViaID,
    getVideoDownloadLinksViaID,
} from "../../../Downloader";
import { PageScraper } from "../../utils";

class VideoInfoScraper {
    private pageScraper: PageScraper;

    constructor(public document: Document) {
        this.pageScraper = new PageScraper(document);
    }

    public getArtist = (): string => this.pageScraper.getVideoArtist();

    public getTitle = (): string => this.pageScraper.getVideoTitle();

    public getLikes = (): number => this.pageScraper.getLikes();

    public getPlays = (): number => this.pageScraper.getVideoPlays();

    public getId = (): string => this.pageScraper.getVideoID();

    public getDate = (): Date => this.pageScraper.getVideoDate();

    public getThumbnail = (): string => this.pageScraper.getVideoArtwork();

    public getRelatedVideos = (): Track[] => {
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
                getDownloadLinks: () => getVideoDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadVideoViaID(id, quality),
            };
        });
    };
}

export default VideoInfoScraper;
