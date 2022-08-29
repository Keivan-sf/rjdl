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
}

export default VideoInfoScraper;
