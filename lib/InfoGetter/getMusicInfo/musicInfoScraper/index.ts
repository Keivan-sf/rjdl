import { MusicAndVideoScraper } from "../../utils";

class MusicInfoScraper extends MusicAndVideoScraper {
    constructor(public document: Document) {
        super(document);
    }
    public getDate = (): Date =>
        new Date(
            this.document
                .querySelector(".dateAdded")!
                .innerHTML.split("Date Added: ")[1]
        );
    public getArtwork = (): string =>
        this.document.querySelector(".artwork img")!.getAttribute("src")!;
}

export default MusicInfoScraper;
