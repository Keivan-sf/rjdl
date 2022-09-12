import * as he from "he";
import { BaseScraperUtils } from "../BaseScraper";

class TrackInfoScraper extends BaseScraperUtils {
    constructor(public trackContainer: Element) {
        super(trackContainer);
    }

    private songCredentialBox: Element | null = null;

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

    public getUrl = (): string => {
        let url = this.trackContainer.querySelector("a")!.getAttribute("href")!;
        return "https://www.radiojavan.com" + url;
    };

    public getId = (): string => {
        const title = this.getTitle();
        const artist = this.getArtist();
        const id = this.parseId(artist + " " + title);
        return id;
    };

    public getArtwork = (): string =>
        this.trackContainer.querySelector("img")!.getAttribute("data-src")!;

    private getIdFromArtworkURL = (artworkURL: string): string => {
        const idSelectorRegex = /(?<=static\/mp3\/)[^\/]+(?=\/)/g;
        return artworkURL.match(idSelectorRegex)![0];
    };

    private getSongCredentialsBox = (): Element => {
        if (!this.songCredentialBox)
            this.songCredentialBox = this.document.querySelector(".songInfo")!;
        return this.songCredentialBox;
    };
}

export { TrackInfoScraper };
