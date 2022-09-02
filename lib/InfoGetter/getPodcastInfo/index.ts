import PodcastInfoScraper from "./podcastInfoScraper";

export const getPodcastInfoFromDOM = (document: Document) => {
    const infoScraper = new PodcastInfoScraper(document);
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
