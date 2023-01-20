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
        expect(scraper.getArtwork()).toBe(
            "https://assets.rjassets.com/static/mp3/koorosh-yebaram-man-(ft-arta-behzad-leito-raha)/5cdfcb379855c7e.jpg"
        );
    });
    test("Should get music id", () => {
        expect(scraper.getId()).toBe(
            "Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)"
        );
    });
    test("Should return related tracks", () => {
        const tracks = scraper.getRelatedTracks();
        expect(tracks).toStrictEqual([
            {
                title: "Jerzan (Ft Sami Low, Sijal, & Arta)",
                artist: "Koorosh",
                artwork:
                    "https://assets.rjassets.com/static/mp3/koorosh-jerzan-(ft-sami-low-sijal-arta)/e6226a76f5056b6.jpg",
                id: "Koorosh-Jerzan-(Ft-Sami-Low-Sijal-Arta)",
                url: "https://rj.app/m/MvDeeZkE",
                getDownloadLinks: tracks[0].getDownloadLinks,
                download: tracks[0].download,
            },
            {
                title: "Ye Roozi",
                artist: "Koorosh, Sami Low, & Raha",
                artwork:
                    "https://assets.rjassets.com/static/mp3/koorosh-sami-low-raha-ye-roozi/2c3e67b5338deb2.jpg",
                id: "Koorosh-Sami-Low-Raha-Ye-Roozi",
                url: "https://rj.app/m/rEr5ey1v",
                getDownloadLinks: tracks[1].getDownloadLinks,
                download: tracks[1].download,
            },
            {
                title: "Business (Ft Sepehr Khalse, Saman Wilson, Sohrab MJ, & Alireza JJ)",
                artist: "Behzad Leito & Sijal",
                artwork:
                    "https://assets.rjassets.com/static/mp3/behzad-leito-sijal-business-(ft-sepehr-khalse-saman-wilson-sohrab-mj-alireza-jj)/0d36a3076d8d928.jpg",
                id: "Behzad-Leito-Sijal-Business-(Ft-Sepehr-Khalse-Saman-Wilson-Sohrab-MJ-Alireza-JJ)",
                url: "https://rj.app/m/zE1g10al",
                getDownloadLinks: tracks[2].getDownloadLinks,
                download: tracks[2].download,
            },
        ]);
    });
});
