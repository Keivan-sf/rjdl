import { PageScraper } from "../PageScraper";

class TrackInfoScraper {
    private pageScraper: PageScraper;
    readonly isPlayingNow: boolean;

    constructor(public trackContainer: Element) {
        this.pageScraper = new PageScraper(trackContainer);
        this.isPlayingNow = trackContainer.classList.contains("active");
    }

    public getArtist = (): string => this.pageScraper.getArtist();

    public getTitle = (): string => this.pageScraper.getTitle();

    public getUrl = (): string => {
        const url = this.trackContainer
            .querySelector("a")!
            .getAttribute("href")!;
        return "https://www.radiojavan.com" + url;
    };

    public getId = (isPodcast = false): string => {
        if (!isPodcast) return this.pageScraper.getMusicID();
        return this.pageScraper.getPodcastID();
    };

    public getArtwork = (): string =>
        this.trackContainer.querySelector("img")!.getAttribute("data-src")!;
}

export { TrackInfoScraper };
