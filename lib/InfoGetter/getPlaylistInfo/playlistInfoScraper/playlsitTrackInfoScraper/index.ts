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
}

export default PlaylistTrackInfoScraper;
