import { PageScraper } from "../PageScraper";

class TrackInfoScraper {
    private pageScraper: PageScraper;

    constructor(public trackContainer: Element) {
        this.pageScraper = new PageScraper(trackContainer);
    }

    public getArtist = (): string => this.pageScraper.getArtist();

    public getTitle = (): string => this.pageScraper.getTitle();

    public getUrl = (): string => {
        let url = this.trackContainer.querySelector("a")!.getAttribute("href")!;
        return "https://www.radiojavan.com" + url;
    };

    public getId = (): string => this.pageScraper.getMusicID();

    public getArtwork = (): string =>
        this.trackContainer.querySelector("img")!.getAttribute("data-src")!;

    private getIdFromArtworkURL = (artworkURL: string): string => {
        const idSelectorRegex = /(?<=static\/mp3\/)[^\/]+(?=\/)/g;
        return artworkURL.match(idSelectorRegex)![0];
    };
}

export { TrackInfoScraper };
