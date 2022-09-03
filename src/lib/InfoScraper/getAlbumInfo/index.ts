import AlbumInfoScraper from "./albumInfoScraper";

export const getAlbumInfoFromDOM = (document: Document) => {
    const infoScraper = new AlbumInfoScraper(document);
    const info = {
        id: infoScraper.getId(),
        title: infoScraper.getName(),
        artist: infoScraper.getArtist(),
        artwork: infoScraper.getArtwork(),
        tracks: infoScraper.getTracks(),
    };
    return info;
};
