import MusicInfoScraper from "./musicInfoScraper";

export const getMusicInfoFromDOM = (document: Document) => {
    const infoScraper = new MusicInfoScraper(document);
    const { artist, title } = infoScraper.getTitleAndArtist();
    return {
        title,
        artist,
        likes: infoScraper.getLikes(),
        plays: infoScraper.getPlays(),
        date: infoScraper.getDate(),
        artwork: infoScraper.getArtwork(),
        id: infoScraper.getId(),
    };
};
