import { Track } from "../..";
import {
    downloadPodcastViaID,
    getPodcastDownloadLinksViaID,
} from "../../../Downloader";
import { PageScraper, TrackInfoScraper } from "../../utils";

class PodcastInfoScraper {
    private pageScraper: PageScraper;

    constructor(public document: Document) {
        this.pageScraper = new PageScraper(document);
    }

    public getId = (): string => this.pageScraper.getPodcastID();

    public getArtist = (): string => this.pageScraper.getPodcastArtist();

    public getTitle = (): string => this.pageScraper.getPodcastTitle();

    public getDate = (): Date => this.pageScraper.getPodcastDate();

    public getArtwork = (): string => this.pageScraper.getPodcastArtwork();

    public getLikes = (): number => this.pageScraper.getLikes();

    public getPlays = (): number => this.pageScraper.getPlays();

    public getRelatedTracks = (): Track[] => {
        const tracks = this.pageScraper.getRelatedTracks();
        return this.getTracks(tracks);
    };

    private getTracks = (tracks: any[]): Track[] => {
        return tracks.map((track) => {
            const id = track.permlink;
            return {
                title: track.title,
                artist: track["podcast_artist"],
                id,
                artwork: track.photo,
                url: track.share_link,
                getDownloadLinks: () => getPodcastDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadPodcastViaID(id, quality),
            };
        });
    };
}

export default PodcastInfoScraper;
