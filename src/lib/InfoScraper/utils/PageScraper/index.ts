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

    public getMusicID = (): string => this.mediaData.permlink;

    public getVideoID = (): string => IdScrapers.getVideoID(this.document);

    public getPodcastID = (): string =>
        IdScrapers.getPodcastID(this.getArtist());

    public getMusicDate = (): Date => new Date(this.mediaData.date);

    public getVideoDate = (): Date => DateScrapers.getVideoDate(this.document);

    public getPodcastDate = (): Date =>
        DateScrapers.getPodcastDate(this.document);

    public getMusicArtwork = (): string => this.mediaData.photo;

    public getArtist = (): string => {
        return this.mediaData.artist;
    };

    public getTitle = (): string => {
        return this.mediaData.song;
    };

    public getLikes = (): number => +this.mediaData.likes.replace(/,/g, "");

    public getPlays = (): number => +this.mediaData.plays.replace(/,/g, "");

    public getRelatedTracks = (): any[] => this.mediaData.related;

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
