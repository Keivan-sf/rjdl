import { getPlaylistInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import fs from "fs";
const mockSourceCode = fs.readFileSync(__dirname + "/mockSource.test.html");

describe("Playlist info getter", () => {
    test("Should return playlist info", () => {
        const DOM = new JSDOM(mockSourceCode);
        const info = getPlaylistInfoFromDOM(DOM.window.document);
        expect(info).toStrictEqual({
            id: "397e42de6e4d",
            title: "Mehmooni",
            creator: "Radio Javan",
            followers: 70324,
            artwork:
                "https://assets.rjassets.com/static/playlist/6628501/608623aeb3b83b6.jpg",
            tracks: [
                {
                    title: "Baila",
                    artist: "Nikita",
                    id: "Nikita-Baila",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/nikita-baila/c512f399401cc7d.jpg",
                    url: "https://rj.app/m/yq55G7Kq",
                    getDownloadLinks: info.tracks[0].getDownloadLinks,
                    download: info.tracks[0].download,
                },
                {
                    title: "Bye Bye Bye",
                    artist: "Donya",
                    id: "Donya-Bye-Bye-Bye",
                    artwork:
                        "https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg",
                    url: "https://rj.app/m/MvDeJokE",
                    getDownloadLinks: info.tracks[1].getDownloadLinks,
                    download: info.tracks[1].download,
                },
            ],
        });
    });
});
