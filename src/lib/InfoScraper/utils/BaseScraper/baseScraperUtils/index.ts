class BaseScraperUtils {
    constructor(public document: Document | Element) {}

    protected getIdFromCredentials = (title: string, artist: string) => {
        const artistAndName = artist + " " + title;
        let id = artistAndName
            .replace(/[^a-zA-Z\d\s\(\)]/g, "")
            .replace(/\s+/g, "-");
        return id;
    };
}

export { BaseScraperUtils };
