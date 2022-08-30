import { JSDOM } from "jsdom";
import PlaylistInfoScraper from ".";

const mockSourceCode = `
<div class="songInfo">
<h2 class="title">Dahe 90</h2>
<span>Created by <span class="label radius secondary">Radio Javan</span> |
<span>100 songs</span> | <span id="follower_count">13,221 followers</span></span></div>
<div class="sidePanel"><ul class="listView">
<li>
<a href="/mp3s/playlist_start?id=14af15307e15&amp;index=0">
<img src="bluh" data-src="https://assets.rjassets.com/static/mp3/shadmehr-aghili-baroon-delam-khast/2a449b8099a18de-thumb.jpg" alt="Shadmehr Aghili - 'Baroon Delam Khast'" class=" lazyloaded">
<div class="songInfo">
<span class="artist" title="Shadmehr Aghili">Shadmehr Aghili</span>
<span class="song" title="Baroon Delam Khast">Baroon Delam Khast</span></div></a>
<button class="button textButton light mp3_playlist_add_playlists" mp3id="95885">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
<path d="" id="path-1"></path></svg></button>
</li>
<li>
<a href="/mp3s/playlist_start?id=14af15307e15&amp;index=1">
<img src="bluh" data-src="https://assets.rjassets.com/static/mp3/mohsen-yeganeh-behet-ghol-midam-(live)/8a56ed3d7f29c8c-thumb.jpg" alt="Mohsen Yeganeh - 'Behet Ghol Midam (Live)'" class=" lazyloaded">
<div class="songInfo">
<span class="artist" title="Mohsen Yeganeh">Mohsen Yeganeh</span>
<span class="song" title="Behet Ghol Midam (Live)">Behet Ghol Midam (Live)</span></div></a>
<button class="button textButton light mp3_playlist_add_playlists" mp3id="65190">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="addSognIcon icon">
<path d="" id="path-1"></path></svg></button>
</li>
</ul></div>
`;
describe("playlist info scraper", () => {
    const DOM = new JSDOM(mockSourceCode).window.document;
    const playlistScraper = new PlaylistInfoScraper(DOM);
    test("Should return track list of playlist", () => {
        expect(playlistScraper.getTracks()).toStrictEqual([
            {
                title: "Baroon Delam Khast",
                artist: "Shadmehr Aghili",
                id: "shadmehr-aghili-baroon-delam-khast",
                artwork:
                    "https://assets.rjassets.com/static/mp3/shadmehr-aghili-baroon-delam-khast/2a449b8099a18de-thumb.jpg",
                url: "https://www.radiojavan.com/mp3s/playlist_start?id=14af15307e15&index=0",
            },
            {
                title: "Behet Ghol Midam (Live)",
                artist: "Mohsen Yeganeh",
                id: "mohsen-yeganeh-behet-ghol-midam-(live)",
                artwork:
                    "https://assets.rjassets.com/static/mp3/mohsen-yeganeh-behet-ghol-midam-(live)/8a56ed3d7f29c8c-thumb.jpg",
                url: "https://www.radiojavan.com/mp3s/playlist_start?id=14af15307e15&index=1",
            },
        ]);
    });
    test("Should return playlist name", () => {
        expect(playlistScraper.getName()).toBe("Dahe 90");
    });
});
