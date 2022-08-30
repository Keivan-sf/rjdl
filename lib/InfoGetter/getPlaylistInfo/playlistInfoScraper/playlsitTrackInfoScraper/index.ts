class PlaylistTrackInfoScraper {
    constructor(public trackContainer: Element) {}
    public getSongAndArtistName = (): { title: string; artist: string } => {
        const songInfo = this.trackContainer.querySelector(".songInfo")!;
        const title = songInfo.querySelector(".song")!.innerHTML;
        const artist = songInfo.querySelector(".artist")!.innerHTML;
        return {
            title,
            artist,
        };
    };
    public getUrl = (): string => {
        let url = this.trackContainer.querySelector("a")!.getAttribute("href")!;
        return "https://www.radiojavan.com" + url;
    };
    public getArtwork = (): string =>
        this.trackContainer.querySelector("img")!.getAttribute("data-src")!;
}

export default PlaylistTrackInfoScraper;
