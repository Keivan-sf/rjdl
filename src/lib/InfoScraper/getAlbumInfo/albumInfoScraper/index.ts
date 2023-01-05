import { AlbumTrack } from "../../interfaces";
import AlbumTrackInfoScraper from "./albumTrackInfoScraper";
import * as he from "he";
import { getMusicDownloadLinksViaID } from "../../../Downloader";

class AlbumInfoScraper {
    constructor(public document: Document) {}

    public getId = (): string =>
        this.document
            .querySelector("meta[property='og:url']")!
            .getAttribute("content")!
            .match(/(?<=\/mp3s\/album\/)[^\/]+/g)![0];

    public getName = (): string =>
        he.decode(this.document.querySelector(".songInfo .album")!.innerHTML);

    public getArtist = (): string =>
        he.decode(this.document.querySelector(".songInfo .artist")!.innerHTML);

    public getArtwork = (): string =>
        this.document
            .querySelector(".artworkContainer .artwork img")!
            .getAttribute("src")!;

    public getTracks = (): AlbumTrack[] => {
        const tracks = this.getTrackElementScrapers();
        return this.getTrackInfoFromTrackScraper(tracks);
    };

    private getTrackElementScrapers = () => {
        const trackContainers = this.getTrackElements();
        return this.convertTrackElementsToScraper(trackContainers);
    };

    private getTrackElements = () =>
        this.document.querySelector(".listView")!.querySelectorAll("li")!;

    private convertTrackElementsToScraper = (
        elements: NodeListOf<HTMLLIElement>
    ): AlbumTrackInfoScraper[] => {
        const scrapers: AlbumTrackInfoScraper[] = [];
        elements.forEach((e) => scrapers.push(new AlbumTrackInfoScraper(e)));
        return scrapers;
    };

    private getTrackInfoFromTrackScraper = (
        tracks: AlbumTrackInfoScraper[]
    ): AlbumTrack[] =>
        tracks.map((track) => {
            const id = track.getId();
            return {
                title: track.getTitle(),
                artist: track.getArtist(),
                index: track.getTrackIndex(),
                id,
                artwork: track.getArtwork(),
                url: track.getUrl(),
                getDownloadLinks: () => getMusicDownloadLinksViaID(id),
            };
        });
}

export default AlbumInfoScraper;
