import VideoInfoScraper from ".";
import { JSDOM } from "jsdom";
describe("Video info scraper", () => {
    test("Should return artist and video name", () => {
        const mockSource = `<div class="songInfo">
        <span class="artist">Donya</span>
        <span class="song">Bye Bye Bye</span>
        <br><span class="artist farsiText" dir="rtl">دنیا</span>
        <span class="song farsiText" dir="rtl">بای بای بای</span>
        </div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const artistAndSongName = new VideoInfoScraper(DOM).getTitleAndArtist();
        expect(artistAndSongName).toStrictEqual({
            title: "Bye Bye Bye",
            artist: "Donya",
        });
    });
    test("Should return video views", () => {
        const mockSource = `<div class="views">Plays: 538,580</div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const viewsCount = new VideoInfoScraper(DOM).getPlays();
        expect(viewsCount).toBe(538580);
    });
    test("Should return video likes", () => {
        const mockSource = `<span class="rating">1,487 likes</span>`;
        const DOM = new JSDOM(mockSource).window.document;
        const viewsCount = new VideoInfoScraper(DOM).getLikes();
        expect(viewsCount).toBe(1487);
    });
    test("Should return video Date", () => {
        const mockSource = `<div pubdate="pubdate" class="date_added">Date added: Aug 27, 2022</div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const date = new VideoInfoScraper(DOM).getDate();
        expect(date).toStrictEqual(new Date("Aug 27, 2022"));
    });
});
