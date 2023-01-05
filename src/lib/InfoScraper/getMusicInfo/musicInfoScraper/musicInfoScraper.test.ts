import { JSDOM } from "jsdom";
import MusicInfoScraper from ".";
describe("Music info scraper", () => {
    test("Should get music name", () => {
        const mockSource = `<div class="songInfo">
        <div class="song">testName</div>
        </div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getTitle()).toBe("testName");
    });
    test("Should get music artist", () => {
        const mockSource = `<div class="songInfo">
        <div class="artist">testArtistName</div>
        </div>`;
        const DOM = new JSDOM(mockSource).window.document;
        const scraper = new MusicInfoScraper(DOM);
        expect(scraper.getArtist()).toBe("testArtistName");
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
            },
        ]);
    });
});
