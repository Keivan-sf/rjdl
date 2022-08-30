import * as he from "he";
class MusicAndVideoScraper {
    constructor(public document: Document) {}
    public getTitleAndArtist = (): { title: string; artist: string } => {
        const songInfoDiv = this.document.querySelector(".songInfo")!;
        const title = he.decode(songInfoDiv?.querySelector(".song")!.innerHTML);
        const artist = he.decode(
            songInfoDiv?.querySelector(".artist")!.innerHTML
        );
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

    protected getAltVersion = (): string | null => {
        let url =
            this.document
                .querySelector("#download")
                ?.querySelector("a")
                ?.getAttribute("href") ?? null;
        if (!url) return url;
        return "https://www.radiojavan.com" + url;
    };
}

export { MusicAndVideoScraper };
