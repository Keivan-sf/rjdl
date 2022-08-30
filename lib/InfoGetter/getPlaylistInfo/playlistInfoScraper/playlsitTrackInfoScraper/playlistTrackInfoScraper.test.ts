import { JSDOM } from "jsdom";
import PlaylistTrackInfoScraper from ".";
// const mockedSourceCode = `<li>
// <a href="/mp3s/playlist_start?id=14af15307e15&amp;index=0">
// <img src="images/blank.gif" data-src="https://assets.rjassets.com/static/mp3/shadmehr-aghili-baroon-delam-khast/2a449b8099a18de-thumb.jpg" alt="Shadmehr Aghili - &#39;Baroon Delam Khast&#39;" class="lazyload" />
// <div class="songInfo">
// <span class="artist" title="Shadmehr Aghili">Shadmehr Aghili</span>
// <span class="song" title="Baroon Delam Khast">Baroon Delam Khast</span></div></a>
// <button class="button textButton light mp3_playlist_add_playlists" mp3id="95885">
// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
// <path d="" id="path-1"></path></svg></button></li>`;
describe("Playlist track info scraper", () => {
    test("Should get song and artist name", () => {
        const mockedSourceCode = `<li>
        <div class="songInfo">
        <span class="artist" title="Shadmehr Aghili">Shadmehr Aghili</span>
        <span class="song" title="Baroon Delam Khast">Baroon Delam Khast</span></div></li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new PlaylistTrackInfoScraper(containerElement);
        expect(scraper.getSongAndArtistName()).toStrictEqual({
            title: "Baroon Delam Khast",
            artist: "Shadmehr Aghili",
        });
    });
    test("Should get song url", () => {
        const mockedSourceCode = `<li><a href="/mp3s/playlist_start?id=14af15307e15&amp;index=0"></li>`;
        const containerElement = new JSDOM(
            mockedSourceCode
        ).window.document.querySelector("li")!;
        const scraper = new PlaylistTrackInfoScraper(containerElement);
        expect(scraper.getUrl()).toBe(
            "https://www.radiojavan.com/mp3s/playlist_start?id=14af15307e15&index=0"
        );
    });
});
