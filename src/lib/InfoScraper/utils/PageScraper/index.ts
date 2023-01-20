import * as he from "he";
import * as IdScrapers from "./idScrapers";
import * as DateScrapers from "./dateScrapers";

class PageScraper {
    private mediaData: any;
    constructor(public document: Document | Element) {
        const rawData = document.querySelector("#__NEXT_DATA__")!.innerHTML;
        const data = JSON.parse(rawData);
        this.mediaData = data.props.pageProps.media;
    }

    private cache: {
        title?: string;
        artist?: string;
        songCredentialBox?: Element;
    } = {};

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
        if (this.cache.artist) return this.cache.artist;
        const songCredentialDiv = this.getSongCredentialsBox();
        this.cache.artist = he.decode(
            songCredentialDiv?.querySelector(".artist")!.innerHTML
        );
        return this.cache.artist;
    };

    public getTitle = (): string => {
        return this.mediaData.song;
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
        if (!this.cache.songCredentialBox)
            this.cache.songCredentialBox =
                this.document.querySelector(".songInfo")!;
        return this.cache.songCredentialBox;
    };

    public static parseId = IdScrapers.parseId;
}

export { PageScraper };
