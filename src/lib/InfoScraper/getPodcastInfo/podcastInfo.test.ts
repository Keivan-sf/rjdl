import { getPodcastInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import fs from "fs";

describe("Get podcast info", () => {
    test("Get podcast info from dom", () => {
        const mockSourceCode = fs.readFileSync(
            __dirname + "/mockSource.test.html"
        );
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getPodcastInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "Yalda-Mix-2022-Veda",
            title: "Yalda Mix 2022",
            artist: "Veda",
            likes: 6638,
            plays: 1883557,
            artwork:
                "https://assets.rjassets.com/static/podcasts/yalda-mix-2022-veda/755c59fdda8e1d0.jpg",
            date: new Date("Dec 21, 2022"),
            relatedTracks: [
                {
                    title: "Abo Atash 117 (Yalda Mix)",
                    artist: "DJ Taba",
                    id: "Abo-Atash-117",
                    artwork:
                        "https://assets.rjassets.com/static/podcasts/abo-atash-117/6658cd29a73f9bd.jpg",
                    url: "https://rj.app/p/dxq9mMxY",
                    getDownloadLinks: results.relatedTracks[0].getDownloadLinks,
                    download: results.relatedTracks[0].download,
                },
                {
                    title: "Yalda Mix 2016",
                    artist: "Dynatonic",
                    id: "Yalda-Mix-2016-Dynatonic",
                    artwork:
                        "https://assets.rjassets.com/static/podcasts/yalda-mix-2016-dynatonic/6303ce294a68d45.jpg",
                    url: "https://rj.app/p/grzKK9yW",
                    getDownloadLinks: results.relatedTracks[1].getDownloadLinks,
                    download: results.relatedTracks[1].download,
                },
            ],
        });
    });
});
