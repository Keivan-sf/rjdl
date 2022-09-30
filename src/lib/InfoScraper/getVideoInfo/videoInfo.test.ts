import { getVideoInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
const mockSourceCode = `
<div class="songInfo">
<span class="artist">Donya</span>
<span class="song">Bye Bye Bye</span>
<br><span class="artist farsiText" dir="rtl">دنیا</span>
<span class="song farsiText" dir="rtl">بای بای بای</span></div>
<div class="views">Plays: 538,580</div>
<span class="rating">12,487 likes</span>
<div pubdate="pubdate" class="date_added">Date added: Aug 27, 2022</div>
<input type="hidden" name="playlist_item_permlink" id="playlist_item_permlink" value="donya-bye-bye-bye" />
<meta property="og:image" content="https://assets.rjassets.com/static/musicvideos/images/1860382b80a06ed-original-larger.jpeg" />
<div id="download">
<a class="button textButton" href="/mp3s/mp3/Donya-Bye-Bye-Bye">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="plusIcon icon">
<path d="" id="path-1"></path></svg></a></div>

<div class="sidePanel">
<ul class="listView">

<li>
<a href="/videos/video/nikita-dcm" data-no-turbolink="">
<img src="https://assets.rjassets.com/static/musicvideos/images/441248661814f68-original.jpeg" data-src="https://assets.rjassets.com/static/musicvideos/images/441248661814f68-original.jpeg" alt="Nikita - 'DCM'" class=" ls-is-cached lazyloaded">
<div class="songInfo">
<span class="artist" title="Nikita">Nikita</span>
<span class="song" title="DCM">DCM</span>
</div>
</a>

<button class="button primaryButton video_playlist_add add_playlist" videoid="9384" aria-describedby="ui-tooltip-19">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
<path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
</svg>
</button>
</li>

<li>
<a href="/videos/video/nikita-shenakhtamet-(remix)" data-no-turbolink="">
<img src="https://assets.rjassets.com/static/musicvideos/images/4b6a7322182a064-original.jpeg" data-src="https://assets.rjassets.com/static/musicvideos/images/4b6a7322182a064-original.jpeg" alt="Nikita - 'Shenakhtamet (Remix)'" class=" ls-is-cached lazyloaded">
<div class="songInfo">
<span class="artist" title="Nikita">Nikita</span>
<span class="song" title="Shenakhtamet (Remix)">Shenakhtamet (Remix)</span>
</div>
</a>

<button class="button primaryButton video_playlist_add add_playlist" videoid="8972" aria-describedby="ui-tooltip-20">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
<path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
</svg>
</button>
</li>

<li>
<a href="/videos/video/nikita-sherym-boom-boom" data-no-turbolink="">
<img src="https://assets.rjassets.com/static/musicvideos/images/f89b8151c74f74f-original.jpeg" data-src="https://assets.rjassets.com/static/musicvideos/images/f89b8151c74f74f-original.jpeg" alt="Nikita &amp; SheryM - 'Boom Boom'" class=" ls-is-cached lazyloaded">
<div class="songInfo">
<span class="artist" title="Nikita &amp; SheryM">Nikita &amp; SheryM</span>
<span class="song" title="Boom Boom">Boom Boom</span>
</div>
</a>

<button class="button primaryButton video_playlist_add add_playlist" videoid="7302" aria-describedby="ui-tooltip-21">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
<path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
</svg>
</button>
</li>

</ul>
</div>
`;
describe("Get video info", () => {
    test("Get video info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getVideoInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "donya-bye-bye-bye",
            title: "Bye Bye Bye",
            artist: "Donya",
            likes: 12487,
            plays: 538580,
            thumbnail:
                "https://assets.rjassets.com/static/musicvideos/images/1860382b80a06ed-original-larger.jpeg",
            date: new Date("Aug 27, 2022"),
            song: "https://www.radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye",
            relatedVideos: [
                {
                    title: "Shenakhtamet (Remix)",
                    artist: "Nikita",
                    id: "Nikita-Shenakhtamet-(Remix)",
                    url: "https://www.radiojavan.com/videos/video/nikita-shenakhtamet-(remix)",
                    artwork:
                        "https://assets.rjassets.com/static/musicvideos/images/4b6a7322182a064-original.jpeg",
                },
                {
                    title: "Boom Boom",
                    artist: "Nikita & SheryM",
                    id: "Nikita-SheryM-Boom-Boom",
                    url: "https://www.radiojavan.com/videos/video/nikita-sherym-boom-boom",
                    artwork:
                        "https://assets.rjassets.com/static/musicvideos/images/f89b8151c74f74f-original.jpeg",
                },
            ],
        });
    });
});
