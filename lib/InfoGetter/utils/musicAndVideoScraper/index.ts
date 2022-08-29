class MusicAndVideoScraper {
    constructor(public document: Document) {}
    public getTitleAndArtist = (): { title: string; artist: string } => {
        const songInfoDiv = this.document.querySelector(".songInfo")!;
        const title = songInfoDiv?.querySelector(".song")!.innerHTML;
        const artist = songInfoDiv?.querySelector(".artist")!.innerHTML;
        return { title, artist };
    };

    public getLikes = (): number =>
        +this.document
            .querySelector(".rating")!
            .innerHTML.split(" likes")[0]
            .replace(/,/g, "");

    public getPlays = (): number =>
        +this.document
            .querySelector(".views")!
            .innerHTML.split("Plays: ")[1]
            .replace(/,/g, "");

    public getDate = (): Date =>
        new Date(
            this.document
                .querySelector(".dateAdded")!
                .innerHTML.split("Date Added: ")[1]
        );
}

export { MusicAndVideoScraper };
