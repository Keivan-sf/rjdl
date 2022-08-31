import { PlaylistTrack } from "../../interfaces";
import PlaylistTrackInfoScraper from "./playlistTrackInfoScraper";

class PlaylistInfoScraper {
    constructor(public document: Document) {}

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
    public getTracks = (): PlaylistTrack[] => {
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
    ): PlaylistTrackInfoScraper[] => {
        const scrapers: PlaylistTrackInfoScraper[] = [];
        elements.forEach((e) => scrapers.push(new PlaylistTrackInfoScraper(e)));
        return scrapers;
    };

    private getTrackInfoFromTrackScraper = (
        tracks: PlaylistTrackInfoScraper[]
    ): PlaylistTrack[] =>
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
