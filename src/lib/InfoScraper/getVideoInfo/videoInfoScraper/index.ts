import { Track } from "../..";
import {
    downloadVideoViaID,
    getVideoDownloadLinksViaID,
} from "../../../Downloader";
import { PageScraper, TrackInfoScraper } from "../../utils";

class VideoInfoScraper {
    private pageScraper: PageScraper;

    constructor(public document: Document) {
        this.pageScraper = new PageScraper(document);
    }

    public getArtist = (): string => this.pageScraper.getArtist();

    public getTitle = (): string => this.pageScraper.getTitle();

    public getLikes = (): number => this.pageScraper.getLikes();

    public getPlays = (): number => this.pageScraper.getPlays();

    public getId = (): string => this.pageScraper.getVideoID();

    public getDate = (): Date => this.pageScraper.getVideoDate();

    public getThumbnail = (): string =>
        this.document
            .querySelector("meta[property='og:image']")!
            .getAttribute("content")!;

    public getRelatedVideos = (): Track[] => {
        const tracks = this.getTrackElementScrapers();
        return this.getTrackInfoFromTrackScraper(tracks);
    };

    private getTrackElementScrapers = () => {
        const trackContainers = this.getTrackElements();
        return this.convertTrackElementsToScraper(trackContainers);
    };

    private getTrackElements = () =>
        this.document
            .querySelector(".sidePanel .listView")!
            .querySelectorAll("li")!;

    private convertTrackElementsToScraper = (
        elements: NodeListOf<HTMLLIElement>
    ): TrackInfoScraper[] => {
        const scrapers: TrackInfoScraper[] = [];
        elements.forEach((e) => scrapers.push(new TrackInfoScraper(e)));
        return scrapers;
    };

    private getTrackInfoFromTrackScraper = (
        tracks: TrackInfoScraper[]
    ): Track[] => {
        // in related videos section, first video is currently being played
        tracks.shift();
        return tracks.map((track) => {
            const id = track.getId();
            return {
                title: track.getTitle(),
                artist: track.getArtist(),
                id,
                artwork: track.getArtwork(),
                url: track.getUrl(),
                getDownloadLinks: () => getVideoDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadVideoViaID(id, quality),
            };
        });
    };
}

export default VideoInfoScraper;
