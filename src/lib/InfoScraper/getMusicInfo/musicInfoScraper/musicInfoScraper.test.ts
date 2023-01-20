import { JSDOM } from "jsdom";
import MusicInfoScraper from ".";
import fs from "fs";
const mockSource = fs.readFileSync(__dirname + "/mockSource.test.html");
const DOM = new JSDOM(mockSource).window.document;
const scraper = new MusicInfoScraper(DOM);
describe("Music info scraper", () => {
    test("Should get music name", () => {
        expect(scraper.getTitle()).toBe(
            "Yebaram Man (Ft Arta, Behzad Leito, & Raha)"
        );
    });
    test("Should get music artist", () => {
        expect(scraper.getArtist()).toBe("Koorosh");
    });
    test("Should get music likes", () => {
        expect(scraper.getLikes()).toBe(49383);
    });
    test("Should get music plays", () => {
        expect(scraper.getPlays()).toBe(47349386);
    });
    test("Should get music date", () => {
        expect(scraper.getDate()).toStrictEqual(new Date("Jun 4, 2019"));
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
    test("Should return related tracks", () => {
        const mockSource = `<div class="sidePanel"><ul class="listView">
        <li>
        <a href="/mp3s/mp3/Sogand-Daad-Nazan?start=109320&amp;index=0">
        <img src="https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20-thumb.jpg" data-src="https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20-thumb.jpg" alt="Sogand - 'Daad Nazan'" class=" lazyloaded">
        <div class="songInfo">
        <span class="artist" title="Sogand">Sogand</span>
        <span class="song" title="Daad Nazan">Daad Nazan</span>
        </div>
        </a>
        <button class="" mp3id="109320"><svg xmlns="" xmlns:xlink="" viewBox="" class=""><path d=""></path></svg></button>
        </li>
        </ul></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        const tracks = scraper.getRelatedTracks();
        expect(tracks).toStrictEqual([
            {
                title: "Daad Nazan",
                artist: "Sogand",
                artwork:
                    "https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20-thumb.jpg",
                id: "Sogand-Daad-Nazan",
                url: "https://www.radiojavan.com/mp3s/mp3/Sogand-Daad-Nazan?start=109320&index=0",
                getDownloadLinks: tracks[0].getDownloadLinks,
                download: tracks[0].download,
            },
        ]);
    });
    test("Should return related tracks while ignoring the active track", () => {
        const mockSource = `<div class="sidePanel"><ul class="listView">
        <li class="active">
        <a href="/mp3s/mp3/Sogand-Talkh-(Ft-Zakhmi)?start=109320&amp;index=3">
        <img src="images/blank.gif" data-src="https://assets.rjassets.com/static/mp3/sogand-talkh-(ft-zakhmi)/6890060b960db50-thumb.jpg" alt="Sogand - &#39;Talkh (Ft Zakhmi)&#39;" class="lazyload" />
        <div class="songInfo">
        <span class="artist" title="Sogand">Sogand</span>
        <span class="song" title="Talkh (Ft Zakhmi)">Talkh (Ft Zakhmi)</span>
        </div></a>
        <button class="" mp3id="109668"><svg xmlns="" xmlns:xlink="" viewBox="" class=""><path d="" id=""></path></svg></button>
        </li>
        <li>
        <a href="/mp3s/mp3/Sogand-Daad-Nazan?start=109320&amp;index=0">
        <img src="https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20-thumb.jpg" data-src="https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20-thumb.jpg" alt="Sogand - 'Daad Nazan'" class=" lazyloaded">
        <div class="songInfo">
        <span class="artist" title="Sogand">Sogand</span>
        <span class="song" title="Daad Nazan">Daad Nazan</span>
        </div>
        </a>
        <button class="" mp3id="109320"><svg xmlns="" xmlns:xlink="" viewBox="" class=""><path d=""></path></svg></button>
        </li>
        </ul></div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        const tracks = scraper.getRelatedTracks();
        expect(tracks).toStrictEqual([
            {
                title: "Daad Nazan",
                artist: "Sogand",
                artwork:
                    "https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20-thumb.jpg",
                id: "Sogand-Daad-Nazan",
                url: "https://www.radiojavan.com/mp3s/mp3/Sogand-Daad-Nazan?start=109320&index=0",
                getDownloadLinks: tracks[0].getDownloadLinks,
                download: tracks[0].download,
            },
        ]);
    });
});
