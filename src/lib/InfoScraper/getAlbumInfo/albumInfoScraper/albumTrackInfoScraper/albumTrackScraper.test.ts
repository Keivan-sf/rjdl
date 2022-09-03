import { JSDOM } from "jsdom";
import AlbumTrackInfoScraper from ".";

describe("Album track scraper", () => {
    test("Should get album track index", () => {
        const mockedSourceCode = `<li><div class="album_track">
        1.
        </div></li>`;
        const dom = new JSDOM(mockedSourceCode).window.document.querySelector(
            "li"
        )!;
        const scraper = new AlbumTrackInfoScraper(dom);
        expect(scraper.getTrackIndex()).toBe(1);
    });
    test("Should get album track index multiple digits", () => {
        const mockedSourceCode = `<li><div class="album_track">
        17.
        </div></li>`;
        const dom = new JSDOM(mockedSourceCode).window.document.querySelector(
            "li"
        )!;
        const scraper = new AlbumTrackInfoScraper(dom);
        expect(scraper.getTrackIndex()).toBe(17);
    });
});
