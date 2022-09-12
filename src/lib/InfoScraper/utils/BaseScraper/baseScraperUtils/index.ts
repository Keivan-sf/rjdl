class BaseScraperUtils {
    constructor(public document: Document | Element) {}

    protected parseId = (id: string) =>
        id
            .trim()
            .replace(/[^a-zA-Z\d\s\(\)]/g, "")
            .replace(/\s+/g, "-");
}

export { BaseScraperUtils };
