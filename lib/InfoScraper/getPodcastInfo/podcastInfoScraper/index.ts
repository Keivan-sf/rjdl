import { BaseInfoScraper } from "../../utils";

class PodcastInfoScraper extends BaseInfoScraper {
    constructor(document: Document) {
        super(document);
    }

    public getId = (): string => {
        const artworkURL = this.getArtwork();
        const id = this.getIdFromArtworkURL(artworkURL);
        return id;
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
