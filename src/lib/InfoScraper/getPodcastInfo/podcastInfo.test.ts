import { getPodcastInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
const mockSourceCode = `
<div class="artwork">
<img alt="Releji - 'TranceForm 114'" class="cover" src="https://assets.rjassets.com/static/podcasts/tranceform-114/59c077fed000038.jpg">
<div class="songInfo">
<span class="artist">TranceForm 114</span>
<span class="song">Releji</span>
</div>
</div>
<span class="rating">123 likes</span>
<div class="mp3Description">
<div class="views">Plays: 33,641</div>
<div pubdate="pubdate" class="dateAdded">Date added: Sep 1, 2022</div>
</div>

<div class="sidePanel">

<ul class="listView">

<li>
<a href="/podcasts/podcast/Naab-8?start=3614&amp;index=1">
<img src="https://assets.rjassets.com/static/podcasts/naab-8/93c8a9e02afe1b1-thumb.jpg" data-src="https://assets.rjassets.com/static/podcasts/naab-8/93c8a9e02afe1b1-thumb.jpg" alt="DJ Hesam - 'Naab 8'" class=" lazyloaded">
<div class="nowPlayingIcon">
</div>
<div class="songInfo">
<span class="artist">Naab 8</span>
<span class="song">DJ Hesam</span>
</div>
</a>
</li>

<li class="active">
<a href="/podcasts/podcast/Naab-9?start=3614&amp;index=0">
<img src="https://assets.rjassets.com/static/podcasts/naab-9/cbcc7c43622c4ea-thumb.jpg" data-src="https://assets.rjassets.com/static/podcasts/naab-9/cbcc7c43622c4ea-thumb.jpg" alt="DJ Tupic - 'Naab 9'" class=" lazyloaded">
<div class="nowPlayingIcon">
</div>
<div class="songInfo">
<span class="artist">Naab 9</span>
<span class="song">DJ Tupic</span>
</div>
<i class="icon-play-circle icon-large icon" style="display: none"></i>
</a>
</li>

<li>
<a href="/podcasts/podcast/Naab-7?start=3614&amp;index=2">
<img src="https://assets.rjassets.com/static/podcasts/naab-7/7ba1f4b6d2f5629-thumb.jpg" data-src="https://assets.rjassets.com/static/podcasts/naab-7/7ba1f4b6d2f5629-thumb.jpg" alt="DJ Nojan - 'Naab 7'" class=" lazyloaded">
<div class="nowPlayingIcon">
</div>
<div class="songInfo">
<span class="artist">Naab 7</span>
<span class="song">DJ Nojan</span>
</div>
</a>
</li>

</ul>

</div>

`;
describe("Get podcast info", () => {
    test("Get podcast info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getPodcastInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "TranceForm-114",
            title: "TranceForm 114",
            artist: "Releji",
            likes: 123,
            plays: 33641,
            artwork:
                "https://assets.rjassets.com/static/podcasts/tranceform-114/59c077fed000038.jpg",
            date: new Date("Sep 1, 2022"),
            relatedTracks: [
                {
                    title: "Naab 8",
                    artist: "DJ Hesam",
                    id: "Naab-8",
                    artwork:
                        "https://assets.rjassets.com/static/podcasts/naab-8/93c8a9e02afe1b1-thumb.jpg",
                    url: "https://www.radiojavan.com/podcasts/podcast/Naab-8?start=3614&index=1",
                },
                {
                    title: "Naab 7",
                    artist: "DJ Nojan",
                    id: "Naab-7",
                    artwork:
                        "https://assets.rjassets.com/static/podcasts/naab-7/7ba1f4b6d2f5629-thumb.jpg",
                    url: "https://www.radiojavan.com/podcasts/podcast/Naab-7?start=3614&index=2",
                },
            ],
        });
    });
});
