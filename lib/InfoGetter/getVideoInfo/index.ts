import VideoInfoScraper from "./videoInfoScraper";

export const getVideoInfoFromDOM = (document: Document) => {
    const infoScraper = new VideoInfoScraper(document);
    const { artist, title } = infoScraper.getTitleAndArtist();
    const likes = infoScraper.getLikes();
    const plays = infoScraper.getPlays();
    const date = infoScraper.getDate();
    return {
        title,
        artist,
        likes,
        plays,
        date,
    };
};
