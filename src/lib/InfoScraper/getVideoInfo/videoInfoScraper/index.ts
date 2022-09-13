import { PageScraper } from "../../utils";

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

    public getMusicVersion = (): string | null =>
        this.pageScraper.getAltVersion();

    public getThumbnail = (): string =>
        this.document
            .querySelector("meta[property='og:image']")!
            .getAttribute("content")!;
}

export default VideoInfoScraper;
