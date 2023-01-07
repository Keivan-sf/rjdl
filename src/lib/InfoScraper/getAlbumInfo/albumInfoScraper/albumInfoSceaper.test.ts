import { JSDOM } from "jsdom";
import AlbumInfoScraper from ".";

const mockSourceCode = `
<meta property="og:url" content="https://www.radiojavan.com/mp3s/album/Koorosh-420">
<div class="artworkContainer">
<div class="leftColumn">
<div class="artwork">
<img alt="Koorosh - Yebaram Man (Ft Arta, Behzad Leito, &amp; Raha) Song | کوروش یه بارم من آرتا بهزاد لیتو رها&#39;" class="" src="https://assets.rjassets.com/static/mp3/koorosh-yebaram-man-(ft-arta-behzad-leito-raha)/5cdfcb379855c7e.jpg" />
<div class="songInfo">
<span class="artist">Koorosh</span>
<span class="album">420</span>
<span class="song">Yebaram Man (Ft Arta, Behzad Leito, &amp; Raha)</span>
<div style="padding-top: 20px" class="farsiText">
<h1>
<span class="artist">کوروش</span><br />
<span class="album" dir="rtl">۴۲۰</span><br />
<span class="song" dir="rtl">یه بارم من آرتا بهزاد لیتو رها</span>
</h1></div></div></div></div>
<ul class="listView">
<li class="active">
<a href="/mp3s/album/Koorosh-420?index=0">
<div class="album_track">
1.
</div>
<img src="images/blank.gif" data-src="https://assets.rjassets.com/static/mp3/koorosh-yebaram-man-(ft-arta-behzad-leito-raha)/5cdfcb379855c7e-thumb.jpg" alt="Koorosh - &#39;Yebaram Man (Ft Arta, Behzad Leito, &amp; Raha)&#39;" class="lazyload" />
<div class="nowPlayingIcon" style="left: 38px;">
</div>
<div class="songInfo">
<span class="artist" title="Koorosh">Koorosh</span>
<span class="song" title="Yebaram Man (Ft Arta, Behzad Leito, &amp; Raha)">Yebaram Man (Ft Arta, Behzad Leito, &amp; Raha)</span>
</div>
</a>
</li>
<li>
<a href="/mp3s/album/Koorosh-420?index=1">
<div class="album_track">
2.
</div>
<img src="images/blank.gif" data-src="https://assets.rjassets.com/static/mp3/koorosh-jerzan-(ft-sami-low-sijal-arta)/e6226a76f5056b6-thumb.jpg" alt="Koorosh - &#39;Jerzan (Ft Sami Low, Sijal, &amp; Arta)&#39;" class="lazyload" />
<div class="nowPlayingIcon" style="left: 38px;">
</div>
<div class="songInfo">
<span class="artist" title="Koorosh">Koorosh</span>
<span class="song" title="Jerzan (Ft Sami Low, Sijal, &amp; Arta)">Jerzan (Ft Sami Low, Sijal, &amp; Arta)</span>
</div>
</a>
</li>
</ul>
`;
describe("playlist info scraper", () => {
    const DOM = new JSDOM(mockSourceCode).window.document;
    const albumScraper = new AlbumInfoScraper(DOM);
    test("Should return track list of album", () => {
        const tracks = albumScraper.getTracks();
        expect(tracks).toStrictEqual([
            {
                title: "Yebaram Man (Ft Arta, Behzad Leito, & Raha)",
                artist: "Koorosh",
                id: "Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)",
                artwork:
                    "https://assets.rjassets.com/static/mp3/koorosh-yebaram-man-(ft-arta-behzad-leito-raha)/5cdfcb379855c7e-thumb.jpg",
                url: "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=0",
                getDownloadLinks: tracks[0].getDownloadLinks,
                download: tracks[0].download,
                index: 1,
            },
            {
                title: "Jerzan (Ft Sami Low, Sijal, & Arta)",
                artist: "Koorosh",
                id: "Koorosh-Jerzan-(Ft-Sami-Low-Sijal-Arta)",
                artwork:
                    "https://assets.rjassets.com/static/mp3/koorosh-jerzan-(ft-sami-low-sijal-arta)/e6226a76f5056b6-thumb.jpg",
                url: "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=1",
                getDownloadLinks: tracks[1].getDownloadLinks,
                download: tracks[1].download,
                index: 2,
            },
        ]);
    });
    test("Should return album name", () => {
        expect(albumScraper.getName()).toBe("420");
    });
    test("Should return album artist", () => {
        expect(albumScraper.getArtist()).toBe("Koorosh");
    });
    test("Should return album cover", () => {
        expect(albumScraper.getArtwork()).toBe(
            "https://assets.rjassets.com/static/mp3/koorosh-yebaram-man-(ft-arta-behzad-leito-raha)/5cdfcb379855c7e.jpg"
        );
    });
    test("Should return album id", () => {
        expect(albumScraper.getId()).toBe("Koorosh-420");
    });
});
