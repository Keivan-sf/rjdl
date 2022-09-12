import * as he from "he";
import { BaseScraperUtils } from "./baseScraperUtils";

class BaseScraper extends BaseScraperUtils {
    constructor(documents: Document) {
        super(documents);
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

    protected getSongCredentialsBox = (): Element => {
        if (!this.songCredentialBox)
            this.songCredentialBox = this.document.querySelector(".songInfo")!;
        return this.songCredentialBox;
    };
}

export { BaseScraper, BaseScraperUtils };