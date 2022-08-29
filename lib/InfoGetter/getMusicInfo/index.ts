import MusicInfoScraper from "./musicInfoScraper";

export const getMusicInfoFromDOM = (document: Document) => {
    const infoScraper = new MusicInfoScraper(document);
    const { artist, name } = infoScraper.getSongAndArtistName();
    const likes = infoScraper.getLikes();
    const plays = infoScraper.getPlays();
    const date = infoScraper.getDate();
    return {
        name,
        artist,
        likes,
        plays,
        date,
    };
};
