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

    public getVideoID = (): string => this.mediaData.permlink;

    public getPodcastID = (): string => this.mediaData.permlink;

    public getMusicDate = (): Date => new Date(this.mediaData.date);

    public getVideoDate = (): Date => new Date(this.mediaData.date);

    public getPodcastDate = (): Date => new Date(this.mediaData["date_added"]);

    public getMusicArtwork = (): string => this.mediaData.photo;

    public getPodcastArtwork = (): string => this.mediaData.photo;

    public getVideoArtwork = (): string => this.mediaData.photo;

    public getArtist = (): string => this.mediaData.artist;

    public getPodcastArtist = (): string => this.mediaData["podcast_artist"];

    public getVideoArtist = (): string => this.mediaData.artist;

    public getTitle = (): string => {
        return this.mediaData.song;
    };

    public getPodcastTitle = (): string => this.mediaData.title;

    public getVideoTitle = (): string => this.mediaData.song;

    public getLikes = (): number => +this.mediaData.likes.replace(/,/g, "");

    public getPlays = (): number => +this.mediaData.plays.replace(/,/g, "");

    public getVideoPlays = (): number =>
        +this.mediaData.views.replace(/,/g, "");

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
