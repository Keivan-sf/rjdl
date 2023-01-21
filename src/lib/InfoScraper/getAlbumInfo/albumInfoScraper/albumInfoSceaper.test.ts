import { JSDOM } from "jsdom";
import AlbumInfoScraper from ".";
import fs from "fs";
const mockSourceCode = fs.readFileSync(__dirname + "/mockSource.test.html");

describe("playlist info scraper", () => {
    const DOM = new JSDOM(mockSourceCode).window.document;
    const albumScraper = new AlbumInfoScraper(DOM);
    test("Should return track list of album", () => {
        const tracks = albumScraper.getTracks();
        expect(tracks).toStrictEqual([
            {
                title: "Asemoon",
                artist: "Gdaal & Madgal",
                id: "Gdaal-Madgal-Asemoon",
                artwork:
                    "https://assets.rjassets.com/static/mp3/gdaal-madgal-asemoon/dab11cfc4831a4e.jpg",
                url: "https://rj.app/m/Qq6BxO1q",
                getDownloadLinks: tracks[0].getDownloadLinks,
                download: tracks[0].download,
                index: 1,
            },
            {
                title: "Khoda Mano Doos Dare",
                artist: "Gdaal & Madgal",
                id: "Gdaal-Madgal-Khoda-Mano-Doos-Dare",
                artwork:
                    "https://assets.rjassets.com/static/mp3/gdaal-madgal-khoda-mano-doos-dare/2458657f7f7309d.jpg",
                url: "https://rj.app/m/dv2PbNzq",
                getDownloadLinks: tracks[1].getDownloadLinks,
                download: tracks[1].download,
                index: 2,
            },
        ]);
    });
    test("Should return album name", () => {
        expect(albumScraper.getName()).toBe("Banafsh");
    });
    test("Should return album artist", () => {
        expect(albumScraper.getArtist()).toBe("Gdaal & Madgal");
    });
    test("Should return album cover", () => {
        expect(albumScraper.getArtwork()).toBe(
            "https://assets.rjassets.com/static/mp3/gdaal-madgal-banafsh/c558181fe180e4d.jpg"
        );
    });
    test("Should return album id", () => {
        expect(albumScraper.getId()).toBe("Gdaal-Madgal-Banafsh");
    });
});
