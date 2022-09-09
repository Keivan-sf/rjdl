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
    test("Should get music artwork", () => {
        const mockSource = `<div class="artwork">
        <img alt="Donya - Bye Bye Bye Song | دنیا بای بای بای'" class="" src="https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg">
        <div class="songInfo">
        <span class="artist">Donya</span><span class="song">Bye Bye Bye</span>
        <div style="padding-top: 20px" class="farsiText"><h1><span class="artist">دنیا</span><br>
        <span class="song" dir="rtl">بای بای بای</span></h1></div></div></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getArtwork()).toBe(
            "https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg"
        );
    });
    test("Should get music id", () => {
        const mockSource = `<div class="artwork">
        <img alt="Donya - Bye Bye Bye Song | دنیا بای بای بای'" class="" src="https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg">
        <div class="songInfo">
        <span class="artist">Donya</span><span class="song">Bye Bye Bye</span>
        <div style="padding-top: 20px" class="farsiText"><h1><span class="artist">دنیا</span><br>
        <span class="song" dir="rtl">بای بای بای</span></h1></div></div></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getId()).toBe("Donya-Bye-Bye-Bye");
    });
    test("Should get music video", () => {
        const mockSource = `<div id="download" class="watch">
        <a href="/videos/video/koorosh-abnormal-(ft-arta-montiego)" class="button textButton">
        <i class="fa fa-video-camera">&nbsp;&nbsp;Video</i></a></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getVideoVersion()).toBe(
            "https://www.radiojavan.com/videos/video/koorosh-abnormal-(ft-arta-montiego)"
        );
    });
    test("Should return null for a music without music video", () => {
        const mockSource = `<div></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getVideoVersion()).toBeNull();
    });
});
