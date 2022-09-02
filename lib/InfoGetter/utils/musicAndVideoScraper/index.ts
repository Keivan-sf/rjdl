import { BaseInfoScraper } from "./baseInfoScraper";

class MusicAndVideoScraper extends BaseInfoScraper {
    constructor(public document: Document) {
        super(document);
    }

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
