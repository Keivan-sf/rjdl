import VideoInfoScraper from ".";
import { JSDOM } from "jsdom";
describe("Video info scraper", () => {
    test("Should return video name", () => {
        const mockSource = `<div class="songInfo">
        <span class="song">Bye Bye Bye</span>
        <span class="song farsiText" dir="rtl">بای بای بای</span>
        </div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new VideoInfoScraper(DOM);
        expect(scraper.getTitle()).toBe("Bye Bye Bye");
    });
    test("Should return video artist", () => {
        const mockSource = `<div class="songInfo">
        <span class="artist">Donya</span>
        <br><span class="artist farsiText" dir="rtl">دنیا</span>
        </div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new VideoInfoScraper(DOM);
        expect(scraper.getArtist()).toBe("Donya");
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
    test("Should return related videos", () => {
        const mockSource = `<div class="sidePanel">
        <ul class="listView">
        <li>
        <a href="/videos/video/donya-bye-bye-bye" data-no-turbolink="">
        <img src="https://assets.rjassets.com/static/musicvideos/images/1860382b80a06ed-original.jpeg" data-src="https://assets.rjassets.com/static/musicvideos/images/1860382b80a06ed-original.jpeg" alt="Donya - 'Bye Bye Bye'" class=" ls-is-cached lazyloaded">
        <div class="songInfo">
        <span class="artist" title="Donya">Donya</span>
        <span class="song" title="Bye Bye Bye">Bye Bye Bye</span>
        </div>
        </a>
        
        <button class="button primaryButton video_playlist_add add_playlist" videoid="9496" aria-describedby="ui-tooltip-19">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
        <path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
        </svg>
        </button>
        </li>
        <li>

        <a href="/videos/video/donya-abie-asemoon" data-no-turbolink="">
        <img src="https://assets.rjassets.com/static/musicvideos/images/be9294bd8474fde-original.jpeg" data-src="https://assets.rjassets.com/static/musicvideos/images/be9294bd8474fde-original.jpeg" alt="Donya - 'Abie Asemoon'" class=" ls-is-cached lazyloaded">
        <div class="songInfo">
        <span class="artist" title="Donya">Donya</span>
        <span class="song" title="Abie Asemoon">Abie Asemoon</span>
        </div>
        </a>

        <button class="button primaryButton video_playlist_add add_playlist" videoid="9330" aria-describedby="ui-tooltip-20">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
        <path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
        </svg>
        </button>
        </li>
        </ul></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const tracks = new VideoInfoScraper(DOM).getRelatedVideos();
        expect(tracks).toStrictEqual([
            {
                title: "Abie Asemoon",
                artist: "Donya",
                artwork:
                    "https://assets.rjassets.com/static/musicvideos/images/be9294bd8474fde-original.jpeg",
                url: "https://www.radiojavan.com/videos/video/donya-abie-asemoon",
                id: "Donya-Abie-Asemoon",
                getDownloadLinks: tracks[0].getDownloadLinks,
                download: tracks[0].download,
            },
        ]);
    });
});
