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

    public getVideoVersion = (): string | null =>
        this.pageScraper.getAltVersion();

    public getArtwork = (): string =>
        this.document.querySelector(".artwork img")!.getAttribute("src")!;
}

export default MusicInfoScraper;
