import VideoInfoScraper from "./videoInfoScraper";

export const getVideoInfoFromDOM = (document: Document) => {
    const infoScraper = new VideoInfoScraper(document);
    return {
        title: infoScraper.getTitle(),
        artist: infoScraper.getArtist(),
        id: infoScraper.getId(),
        likes: infoScraper.getLikes(),
        plays: infoScraper.getPlays(),
        date: infoScraper.getDate(),
        thumbnail: infoScraper.getThumbnail(),
        song: infoScraper.getMusicVersion(),
    };
};
