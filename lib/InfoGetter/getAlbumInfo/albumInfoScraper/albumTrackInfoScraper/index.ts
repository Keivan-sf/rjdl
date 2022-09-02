import { TrackInfoScraper } from "../../../utils";

class AlbumTrackInfoScraper extends TrackInfoScraper {
    constructor(public trackContainer: Element) {
        super(trackContainer);
    }
    public getTrackIndex = (): number =>
        +this.trackContainer
            .querySelector(".album_track")!
            .innerHTML.match(/\d+/g)![0];
}

export default AlbumTrackInfoScraper;
