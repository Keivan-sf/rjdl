import { getMusicInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import { getSourceCodeDOMDocument } from "../utils";
const mockSourceCode = `
<div class="artwork">
<img alt="Donya" class="" src="https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg"></div>
<div class="songInfo">
<div class="song">Bye Bye Bye</div>
<div class="artist">Donya</div></div>
<div class="rating">331,122,199 likes</div>
<div class="views">Plays: 107,541,122</div>
<div class="dateAdded">Date Added: Aug 22, 2022</div>
<div id="download" class="watch">
<a href="/videos/video/donya-bye-bye-bye" class="button textButton">
<i class="fa fa-video-camera">&nbsp;&nbsp;Video</i></a></div>
<div class="sidePanel">
<ul class="listView">

<li class="active">
<a href="/mp3s/mp3/Deon-Yadame?start=109868&amp;index=0">
<img src="https://assets.rjassets.com/static/mp3/deon-yadame/e4e3cce1c69fabf-thumb.jpg" data-src="https://assets.rjassets.com/static/mp3/deon-yadame/e4e3cce1c69fabf-thumb.jpg" alt="Deon - 'Yadame'" class=" lazyloaded">
<div class="nowPlayingIcon">
</div>
<div class="songInfo">
<span class="artist" title="Deon">Deon</span>
<span class="song" title="Yadame">Yadame</span>
</div>
</a>
<button class="button textButton mp3_playlist_add_related addToPlaylist" mp3id="109868">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="plusIcon icon">
<path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
</svg>
</button>
</li>

<li>
<a href="/mp3s/mp3/Deon-Almas?start=109868&amp;index=1">
<img src="https://assets.rjassets.com/static/mp3/deon-almas/de7697a23296cbb-thumb.jpg" data-src="https://assets.rjassets.com/static/mp3/deon-almas/de7697a23296cbb-thumb.jpg" alt="Deon - 'Almas'" class=" lazyloaded">
<div class="nowPlayingIcon">
</div>
<div class="songInfo">
<span class="artist" title="Deon">Deon</span>
<span class="song" title="Almas">Almas</span>
</div>
</a>
<button class="button textButton mp3_playlist_add_related addToPlaylist" mp3id="108094">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="plusIcon icon">
<path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
</svg>
</button>
</li>

<li>
<a href="/mp3s/mp3/Satin-Bi-To-Sarde-(Ft-Deon)?start=109868&amp;index=3">
<img src="https://assets.rjassets.com/static/mp3/satin-bi-to-sarde-(ft-deon)/4b1b8388cdf35b0-thumb.jpg" data-src="https://assets.rjassets.com/static/mp3/satin-bi-to-sarde-(ft-deon)/4b1b8388cdf35b0-thumb.jpg" alt="Satin - 'Bi To Sarde (Ft Deon)'" class=" ls-is-cached lazyloaded">
<div class="nowPlayingIcon">
</div>
<div class="songInfo">
<span class="artist" title="Satin">Satin</span>
<span class="song" title="Bi To Sarde (Ft Deon)">Bi To Sarde (Ft Deon)</span>
</div>
</a>
<button class="button textButton mp3_playlist_add_related addToPlaylist" mp3id="104548">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="plusIcon icon">
<path d="M13,11 L21.0081969,11 C21.5446944,11 22,11.4477153 22,12 C22,12.5561352 21.5559546,13 21.0081969,13 L13,13 L13,21.0081969 C13,21.5446944 12.5522847,22 12,22 C11.4438648,22 11,21.5559546 11,21.0081969 L11,13 L2.99180311,13 C2.45530558,13 2,12.5522847 2,12 C2,11.4438648 2.44404538,11 2.99180311,11 L11,11 L11,2.99180311 C11,2.45530558 11.4477153,2 12,2 C12.5561352,2 13,2.44404538 13,2.99180311 L13,11 Z" id="path-1"></path>
</svg>
</button>
</li>

</ul>
</div>
`;
describe("Get music info", () => {
    test("Get music info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getMusicInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "Donya-Bye-Bye-Bye",
            title: "Bye Bye Bye",
            artist: "Donya",
            likes: 331122199,
            plays: 107541122,
            artwork:
                "https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg",
            date: new Date("Aug 22, 2022"),
            video: "https://www.radiojavan.com/videos/video/donya-bye-bye-bye",
            relatedTracks: [
                {
                    title: "Almas",
                    artist: "Deon",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/deon-almas/de7697a23296cbb-thumb.jpg",
                    url: "https://www.radiojavan.com/mp3s/mp3/Deon-Almas?start=109868&index=1",
                    id: "Deon-Almas",
                },
                {
                    title: "Bi To Sarde (Ft Deon)",
                    artist: "Satin",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/satin-bi-to-sarde-(ft-deon)/4b1b8388cdf35b0-thumb.jpg",
                    url: "https://www.radiojavan.com/mp3s/mp3/Satin-Bi-To-Sarde-(Ft-Deon)?start=109868&index=3",
                    id: "Satin-Bi-To-Sarde-(Ft-Deon)",
                },
            ],
        });
    });
});
