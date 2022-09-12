import { JSDOM } from "jsdom";
import { TrackInfoScraper } from ".";

describe("Playlist track info scraper", () => {
    test("Should get song title", () => {
        const mockedSourceCode = `<li>
        <div class="songInfo">
        <span class="song" title="Baroon Delam Khast">Baroon Delam Khast</span></div></li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new TrackInfoScraper(containerElement);
        expect(scraper.getTitle()).toStrictEqual("Baroon Delam Khast");
    });

    test("Should get song artist", () => {
        const mockedSourceCode = `<li>
        <div class="songInfo">
        <span class="artist" title="Shadmehr Aghili">Shadmehr Aghili</span></div></li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new TrackInfoScraper(containerElement);
        expect(scraper.getArtist()).toStrictEqual("Shadmehr Aghili");
    });

    test("Should get song url", () => {
        const mockedSourceCode = `<li><a href="/mp3s/playlist_start?id=14af15307e15&amp;index=0"></li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new TrackInfoScraper(containerElement);
        expect(scraper.getUrl()).toBe(
            "https://www.radiojavan.com/mp3s/playlist_start?id=14af15307e15&index=0"
        );
    });
    test("Should get artwork url", () => {
        const mockedSourceCode = `<li>
        <img src="images/blank.gif" data-src="https://assets.rjassets.com/static/mp3/shadmehr-aghili-baroon-delam-khast/2a449b8099a18de-thumb.jpg" alt="Shadmehr Aghili - &#39;Baroon Delam Khast&#39;" class="lazyload" />
        </li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new TrackInfoScraper(containerElement);
        expect(scraper.getArtwork()).toBe(
            "https://assets.rjassets.com/static/mp3/shadmehr-aghili-baroon-delam-khast/2a449b8099a18de-thumb.jpg"
        );
    });
    test("Should get song id", () => {
        const mockedSourceCode = `<li><div class="songInfo">
        <span class="artist" title="Shadmehr Aghili">Shadmehr Aghili</span>
        <span class="song" title="Baroon Delam Khast">Baroon Delam Khast</span>
        </div></li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new TrackInfoScraper(containerElement);
        expect(scraper.getId()).toBe("Shadmehr-Aghili-Baroon-Delam-Khast");
    });
});
