import MusicInfoScraper from "./musicInfoScraper";

export const getMusicInfoFromDOM = (document: Document) => {
    const infoScraper = new MusicInfoScraper(document);
    return {
        title: infoScraper.getTitle(),
        artist: infoScraper.getArtist(),
        likes: infoScraper.getLikes(),
        plays: infoScraper.getPlays(),
        date: infoScraper.getDate(),
        artwork: infoScraper.getArtwork(),
        id: infoScraper.getId(),
        video: infoScraper.getVideoVersion(),
    };
};
