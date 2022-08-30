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
    test("Should return video ID", () => {
        const mockSource = `<input type="hidden" name="playlist_item_permlink" id="playlist_item_permlink" value="donya-bye-bye-bye" />`;
        const DOM = new JSDOM(mockSource).window.document;
        const id = new VideoInfoScraper(DOM).getId();
        expect(id).toBe("donya-bye-bye-bye");
    });
    test("Should return video thumbnail", () => {
        const mockSource = `<meta property="og:image" content="https://assets.rjassets.com/static/musicvideos/images/1860382b80a06ed-original-larger.jpeg" />`;
        const DOM = new JSDOM(mockSource).window.document;
        const thumbnail = new VideoInfoScraper(DOM).getThumbnail();
        expect(thumbnail).toBe(
            "https://assets.rjassets.com/static/musicvideos/images/1860382b80a06ed-original-larger.jpeg"
        );
    });
    test("Should return music version", () => {
        const mockSource = `<div id="download">
        <a class="button textButton" href="/mp3s/mp3/Koorosh-Abnormal-(Ft-Arta-Montiego)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="plusIcon icon">
        <path d="" id="path-1"></path></svg></a></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const song = new VideoInfoScraper(DOM).getMusicVersion();
        expect(song).toBe(
            "https://www.radiojavan.com/mp3s/mp3/Koorosh-Abnormal-(Ft-Arta-Montiego)"
        );
    });
    test("Should return null for a video without music version", () => {
        const mockSource = `<div></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const song = new VideoInfoScraper(DOM).getMusicVersion();
        expect(song).toBe(null);
    });
});
