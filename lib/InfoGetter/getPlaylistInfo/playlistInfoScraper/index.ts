import { Track } from "../../interfaces";
import { TrackInfoScraper } from "../../utils";

class PlaylistInfoScraper {
    constructor(public document: Document) {}

    public getId = (): string =>
        this.document.querySelector("#follow_playlist")!.getAttribute("item")!;

    public getName = (): string =>
        this.document.querySelector(".songInfo .title")!.innerHTML;

    public getFollowers = (): number =>
        +this.document
            .querySelector("#follower_count")!
            .innerHTML.split(" followers")[0]
            .replace(/,/g, "");

    public getCreator = (): string =>
        this.document.querySelectorAll(".songInfo > span > span")[0].innerHTML;

    public getArtwork = (): string =>
        this.document
            .querySelector(".artworkContainer #playlist_image")!
            .getAttribute("src")!;

    public getTracks = (): Track[] => {
        const tracks = this.getTrackElementScrapers();
        return this.getTrackInfoFromTrackScraper(tracks);
    };

    private getTrackElementScrapers = () => {
        const trackContainers = this.getTrackElements();
        return this.convertTrackElementsToScraper(trackContainers);
    };

    private getTrackElements = () =>
        this.document
            .querySelector(".sidePanel .listView")!
            .querySelectorAll("li")!;

    private convertTrackElementsToScraper = (
        elements: NodeListOf<HTMLLIElement>
    ): TrackInfoScraper[] => {
        const scrapers: TrackInfoScraper[] = [];
        elements.forEach((e) => scrapers.push(new TrackInfoScraper(e)));
        return scrapers;
    };

    private getTrackInfoFromTrackScraper = (
        tracks: TrackInfoScraper[]
    ): Track[] =>
        tracks.map((track) => {
            const { title, artist } = track.getSongAndArtistName();
            return {
                title,
                artist,
                id: track.getId(),
                artwork: track.getArtwork(),
                url: track.getUrl(),
            };
        });
}

export default PlaylistInfoScraper;
