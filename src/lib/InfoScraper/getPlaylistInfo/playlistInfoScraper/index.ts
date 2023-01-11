import { Track } from "../../interfaces";
import { TrackInfoScraper } from "../../utils";
import * as he from "he";
import {
    downloadMusicViaID,
    getMusicDownloadLinksViaID,
} from "../../../Downloader";

class PlaylistInfoScraper {
    constructor(public document: Document) {}

    public getId = (): string =>
        this.document.querySelector("#follow_playlist")!.getAttribute("item")!;

    public getName = (): string =>
        he.decode(this.document.querySelector(".songInfo .title")!.innerHTML);

    public getFollowers = (): number =>
        +this.document
            .querySelector("#follower_count")!
            .innerHTML.split(" followers")[0]
            .replace(/,/g, "");

    public getCreator = (): string =>
        he.decode(
            this.document.querySelectorAll(".songInfo > span > span")[0]
                .innerHTML
        );

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
            const id = track.getId();
            return {
                title: track.getTitle(),
                artist: track.getArtist(),
                id,
                artwork: track.getArtwork(),
                url: track.getUrl(),
                getDownloadLinks: () => getMusicDownloadLinksViaID(id),
                download: (quality?: "lq" | "hq") =>
                    downloadMusicViaID(id, quality),
            };
        });
}

export default PlaylistInfoScraper;
