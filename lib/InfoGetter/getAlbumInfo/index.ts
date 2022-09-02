import { AlbumInfo } from "../interfaces";
import AlbumInfoScraper from "./albumInfoScraper";

export const getAlbumInfoFromDOM = (document: Document): AlbumInfo => {
    const infoScraper = new AlbumInfoScraper(document);
    const info: AlbumInfo = {
        id: infoScraper.getId(),
        title: infoScraper.getName(),
        artist: infoScraper.getArtist(),
        artwork: infoScraper.getArtwork(),
        tracks: infoScraper.getTracks(),
    };
    return info;
};
