import * as he from "he";
import * as IdScrapers from "./idScrapers";
import * as DateScrapers from "./dateScrapers";

class PageScraper {
    constructor(public document: Document | Element) {}

    private songCredentialBox: Element | null = null;

    public getMusicID = (): string =>
        IdScrapers.getMusicID(this.getTitle(), this.getArtist());

    public getVideoID = (): string => IdScrapers.getVideoID(this.document);

    public getPodcastID = (): string =>
        IdScrapers.getPodcastID(this.getArtist());

    public getMusicDate = (): Date => DateScrapers.getMusicDate(this.document);

    public getVideoDate = (): Date => DateScrapers.getVideoDate(this.document);

    public getPodcastDate = (): Date =>
        DateScrapers.getPodcastDate(this.document);

    public getArtist = (): string => {
        const songCredentialDiv = this.getSongCredentialsBox();
        return he.decode(
            songCredentialDiv?.querySelector(".artist")!.innerHTML
        );
    };

    public getTitle = (): string => {
        const songCredentialDiv = this.getSongCredentialsBox();
        return he.decode(songCredentialDiv.querySelector(".song")!.innerHTML);
    };

    public getLikes = (): number =>
        +this.document
            .querySelector(".rating")!
            .innerHTML.split(" likes")[0]
            .replace(/,/g, "");

    public getPlays = (): number =>
        +this.document
            .querySelector(".views")!
            .innerHTML.split("Plays: ")[1]
            .replace(/,/g, "");

    public getAltVersion = (): string | null => {
        const url =
            this.document
                .querySelector("#download")
                ?.querySelector("a")
                ?.getAttribute("href") ?? null;
        if (!url) return url;
        return "https://www.radiojavan.com" + url;
    };

    public getSongCredentialsBox = (): Element => {
        if (!this.songCredentialBox)
            this.songCredentialBox = this.document.querySelector(".songInfo")!;
        return this.songCredentialBox;
    };

    public static parseId = IdScrapers.parseId;
}

export { PageScraper };
