import { MusicAndVideoScraper } from "../../utils";

class MusicInfoScraper extends MusicAndVideoScraper {
    constructor(public document: Document) {
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
                .innerHTML.split("Date Added: ")[1]
        );

    public getVideoVersion = (): string | null => {
        let url =
            this.document
                .querySelector("#download.watch")
                ?.querySelector("a")
                ?.getAttribute("href") ?? null;
        if (!url) return url;
        return "https://www.radiojavan.com" + url;
    };

    public getArtwork = (): string =>
        this.document.querySelector(".artwork img")!.getAttribute("src")!;

    private getIdFromArtworkURL = (artworkURL: string): string => {
        const idSelectorRegex = /(?<=static\/mp3\/)[^\/]+(?=\/)/g;
        return artworkURL.match(idSelectorRegex)![0];
    };
}

export default MusicInfoScraper;
