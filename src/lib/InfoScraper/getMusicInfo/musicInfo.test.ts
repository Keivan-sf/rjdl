import { getMusicInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import fs from "fs";

const mockSourceCode = fs.readFileSync(
    __dirname + "/musicInfoScraper/mockSource.test.html"
);

describe("Get music info", () => {
    test("Get music info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getMusicInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha)",
            title: "Yebaram Man (Ft Arta, Behzad Leito, & Raha)",
            artist: "Koorosh",
            likes: 49383,
            plays: 47349386,
            artwork:
                "https://assets.rjassets.com/static/mp3/koorosh-yebaram-man-(ft-arta-behzad-leito-raha)/5cdfcb379855c7e.jpg",
            date: new Date("Jun 4, 2019"),
            relatedTracks: [
                {
                    title: "Jerzan (Ft Sami Low, Sijal, & Arta)",
                    artist: "Koorosh",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/koorosh-jerzan-(ft-sami-low-sijal-arta)/e6226a76f5056b6.jpg",
                    id: "Koorosh-Jerzan-(Ft-Sami-Low-Sijal-Arta)",
                    url: "https://rj.app/m/MvDeeZkE",
                    getDownloadLinks: results.relatedTracks[0].getDownloadLinks,
                    download: results.relatedTracks[0].download,
                },
                {
                    title: "Ye Roozi",
                    artist: "Koorosh, Sami Low, & Raha",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/koorosh-sami-low-raha-ye-roozi/2c3e67b5338deb2.jpg",
                    id: "Koorosh-Sami-Low-Raha-Ye-Roozi",
                    url: "https://rj.app/m/rEr5ey1v",
                    getDownloadLinks: results.relatedTracks[1].getDownloadLinks,
                    download: results.relatedTracks[1].download,
                },
                {
                    title: "Business (Ft Sepehr Khalse, Saman Wilson, Sohrab MJ, & Alireza JJ)",
                    artist: "Behzad Leito & Sijal",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/behzad-leito-sijal-business-(ft-sepehr-khalse-saman-wilson-sohrab-mj-alireza-jj)/0d36a3076d8d928.jpg",
                    id: "Behzad-Leito-Sijal-Business-(Ft-Sepehr-Khalse-Saman-Wilson-Sohrab-MJ-Alireza-JJ)",
                    url: "https://rj.app/m/zE1g10al",
                    getDownloadLinks: results.relatedTracks[2].getDownloadLinks,
                    download: results.relatedTracks[2].download,
                },
            ],
        });
    });
});
