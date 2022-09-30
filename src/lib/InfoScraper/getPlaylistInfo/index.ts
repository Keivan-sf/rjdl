import PlaylistInfoScraper from "./playlistInfoScraper";

export const getPlaylistInfoFromDOM = (document: Document) => {
    const infoScraper = new PlaylistInfoScraper(document);
    return {
        id: infoScraper.getId(),
        title: infoScraper.getName(),
        creator: infoScraper.getCreator(),
        followers: infoScraper.getFollowers(),
        artwork: infoScraper.getArtwork(),
        tracks: infoScraper.getTracks(),
    };
};
