import * as he from "he";
import { BaseScraper } from "../../utils";

class PodcastInfoScraper extends BaseScraper {
    constructor(document: Document) {
        super(document);
    }

    public getId = (): string => {
        const title = this.getTitle();
        const id = this.parseId(title);
        return id;
    };

    public getArtist = (): string => {
        const songCredentialDiv = this.getSongCredentialsBox();
        // Podcast `artist` and `song` fields are reversed in radio javan page
        return he.decode(songCredentialDiv?.querySelector(".song")!.innerHTML);
    };

    public getTitle = (): string => {
        const songCredentialDiv = this.getSongCredentialsBox();
        // Podcast `artist` and `song` fields are reversed in radio javan page
        return he.decode(songCredentialDiv.querySelector(".artist")!.innerHTML);
    };

    public getDate = (): Date =>
        new Date(
            this.document
                .querySelector(".dateAdded")!
                .innerHTML.split("Date added: ")[1]
        );

    public getArtwork = (): string =>
        this.document.querySelector(".artwork img")!.getAttribute("src")!;

    private getIdFromArtworkURL = (artworkURL: string): string => {
        const idSelectorRegex = /(?<=static\/podcasts\/)[^\/]+(?=\/)/g;
        return artworkURL.match(idSelectorRegex)![0];
    };
}

export default PodcastInfoScraper;
