export const getVideoID = (document: Document | Element): string =>
    document.querySelector("#playlist_item_permlink")!.getAttribute("value")!;

export const getMusicID = (title: string, artist: string) =>
    parseId(artist + " " + title);

export const getPodcastID = (title: string) => parseId(title);

export const parseId = (id: string) =>
    id
        .trim()
        .replace(/[^a-zA-Z\d\s\(\)]/g, "")
        .replace(/\s+/g, "-");
