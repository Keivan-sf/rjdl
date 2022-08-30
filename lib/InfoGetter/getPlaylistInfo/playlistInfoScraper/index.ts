import PlaylistTrackInfoScraper from "./playlistTrackInfoScraper";

class PlaylistInfoScraper {
    constructor(public document: Document) {}

    public getTracks = () => {
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
    ) =>
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
