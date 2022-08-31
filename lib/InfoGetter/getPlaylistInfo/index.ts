import { PlaylistInfo } from "../interfaces";
import PlaylistInfoScraper from "./playlistInfoScraper";

export const getPlaylistInfoFromDOM = (document: Document): PlaylistInfo => {
    const infoScraper = new PlaylistInfoScraper(document);
    return {
        title: infoScraper.getName(),
        creator: infoScraper.getCreator(),
        followers: infoScraper.getFollowers(),
        artwork: infoScraper.getArtwork(),
        tracks: infoScraper.getTracks(),
    };
};
