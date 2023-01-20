import { getVideoInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import fs from "fs";
const mockSourceCode = fs.readFileSync(__dirname + "/mockSource.test.html");
describe("Get video info", () => {
    test("Get video info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getVideoInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "wantons-haminim-ke-hastim",
            title: "Haminim Ke Hastim",
            artist: "Wantons",
            likes: 10349,
            plays: 2088579,
            thumbnail:
                "https://assets.rjassets.com/static/musicvideos/images/36271574176a9e0-original-larger.jpeg",
            date: new Date("Feb 27, 2021"),
            relatedVideos: [
                {
                    title: "Fada Saret",
                    artist: "Wantons",
                    id: "wantons-fada-saret",
                    url: "https://rj.app/v/XPy3omj2",
                    artwork:
                        "https://assets.rjassets.com/static/musicvideos/images/67719ec0bc9d7ff-original-larger.jpeg",
                    getDownloadLinks: results.relatedVideos[0].getDownloadLinks,
                    download: results.relatedVideos[0].download,
                },
                {
                    title: "Abnormal (Ft Arta & Montiego)",
                    artist: "Koorosh",
                    id: "koorosh-abnormal-(ft-arta-montiego)",
                    url: "https://rj.app/v/qjlGEpN6",
                    artwork:
                        "https://assets.rjassets.com/static/musicvideos/images/cad8a3f0821dc46-original-larger.jpeg",
                    getDownloadLinks: results.relatedVideos[1].getDownloadLinks,
                    download: results.relatedVideos[1].download,
                },
            ],
        });
    });
});
