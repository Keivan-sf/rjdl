import { MusicAndVideoScraper } from "../../utils";

class VideoInfoScraper extends MusicAndVideoScraper {
    constructor(public document: Document) {
        super(document);
    }

    public getDate = (): Date =>
        new Date(
            this.document
                .querySelector(".date_added")!
                .innerHTML.split("Date added: ")[1]
        );

    public getId = (): string =>
        this.document
            .querySelector("#playlist_item_permlink")!
            .getAttribute("value")!;

    public getMusicVersion = (): string | null => this.getAltVersion();

    public getThumbnail = (): string =>
        this.document
            .querySelector("meta[property='og:image']")!
            .getAttribute("content")!;
}

export default VideoInfoScraper;
