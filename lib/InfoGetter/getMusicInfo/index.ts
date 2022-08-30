import MusicInfoScraper from "./musicInfoScraper";

export const getMusicInfoFromDOM = (document: Document) => {
    const infoScraper = new MusicInfoScraper(document);
    const { artist, title } = infoScraper.getTitleAndArtist();
    const likes = infoScraper.getLikes();
    const plays = infoScraper.getPlays();
    const date = infoScraper.getDate();
    const artwork = infoScraper.getArtwork();
    return {
        title,
        artist,
        likes,
        plays,
        date,
        artwork,
    };
};
