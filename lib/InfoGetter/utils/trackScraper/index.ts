import * as he from "he";

class TrackInfoScraper {
    constructor(public trackContainer: Element) {}

    public getSongAndArtistName = (): { title: string; artist: string } => {
        const songInfo = this.trackContainer.querySelector(".songInfo")!;
        const title = he.decode(songInfo.querySelector(".song")!.innerHTML);
        const artist = he.decode(songInfo.querySelector(".artist")!.innerHTML);
        return {
            title,
            artist,
        };
    };

    public getUrl = (): string => {
        let url = this.trackContainer.querySelector("a")!.getAttribute("href")!;
        return "https://www.radiojavan.com" + url;
    };

    public getId = (): string => {
        const artworkURL = this.getArtwork();
        const id = this.getIdFromArtworkURL(artworkURL);
        return id;
    };

    public getArtwork = (): string =>
        this.trackContainer.querySelector("img")!.getAttribute("data-src")!;

    private getIdFromArtworkURL = (artworkURL: string): string => {
        const idSelectorRegex = /(?<=static\/mp3\/)[^\/]+(?=\/)/g;
        return artworkURL.match(idSelectorRegex)![0];
    };
}

export { TrackInfoScraper };