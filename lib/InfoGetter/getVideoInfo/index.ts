import VideoInfoScraper from "./videoInfoScraper";

export const getVideoInfoFromDOM = (document: Document) => {
    const infoScraper = new VideoInfoScraper(document);
    const { artist, title } = infoScraper.getTitleAndArtist();
    return {
        title,
        artist,
        id: infoScraper.getId(),
        likes: infoScraper.getLikes(),
        plays: infoScraper.getPlays(),
        date: infoScraper.getDate(),
    };
};
