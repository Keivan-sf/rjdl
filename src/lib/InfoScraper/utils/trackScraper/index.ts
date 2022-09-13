import { PageScraper } from "../PageScraper";

class TrackInfoScraper {
    private pageScraper: PageScraper;

    constructor(public trackContainer: Element) {
        this.pageScraper = new PageScraper(trackContainer);
    }

    public getArtist = (): string => this.pageScraper.getArtist();

    public getTitle = (): string => this.pageScraper.getTitle();

    public getUrl = (): string => {
        const url = this.trackContainer
            .querySelector("a")!
            .getAttribute("href")!;
        return "https://www.radiojavan.com" + url;
    };

    public getId = (): string => this.pageScraper.getMusicID();

    public getArtwork = (): string =>
        this.trackContainer.querySelector("img")!.getAttribute("data-src")!;
}

export { TrackInfoScraper };