import { Track } from "../..";
import { PageScraper, TrackInfoScraper } from "../../utils";

class PodcastInfoScraper {
    private pageScraper: PageScraper;

    constructor(public document: Document) {
        this.pageScraper = new PageScraper(document);
    }

    public getId = (): string => this.pageScraper.getPodcastID();

    // Artist and title fields are reversed in podcast page
    public getArtist = (): string => this.pageScraper.getTitle();

    public getTitle = (): string => this.pageScraper.getArtist();

    public getDate = (): Date => this.pageScraper.getPodcastDate();

    public getArtwork = (): string =>
        this.document.querySelector(".artwork img")!.getAttribute("src")!;

    public getLikes = (): number => this.pageScraper.getLikes();

    public getPlays = (): number => this.pageScraper.getPlays();

    public getRelatedTracks = (): Track[] => {
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
        const relatedTracks = tracks.filter((track) => !track.isPlayingNow);
        return relatedTracks.map((track) => {
            // Artist and title fields are reversed in podcast related tracks
            return {
                title: track.getArtist(),
                artist: track.getTitle(),
                id: track.getId(true),
                artwork: track.getArtwork(),
                url: track.getUrl(),
            };
        });
    };
}

export default PodcastInfoScraper;
