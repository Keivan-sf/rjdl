import { JSDOM } from "jsdom";
import MusicInfoScraper from ".";
describe("Music info scraper", () => {
    test("Should get music name and artist", () => {
        const mockSource = `<div class="songInfo">
        <div class="song">testName</div>
        <div class="artist">testArtistName</div>
        </div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getTitleAndArtist()).toStrictEqual({
            title: "testName",
            artist: "testArtistName",
        });
    });
    test("Should get music likes", () => {
        const mockSource = `<div class="rating">331,122,199 likes</div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getLikes()).toBe(331122199);
    });
    test("Should get music plays", () => {
        const mockSource = `<div class="views">Plays: 107,541,122</div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getPlays()).toBe(107541122);
    });
    test("Should get music date", () => {
        const mockSource = `<div class="dateAdded">Date Added: Aug 22, 2022</div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getDate()).toStrictEqual(new Date("Aug 22, 2022"));
    });
});
