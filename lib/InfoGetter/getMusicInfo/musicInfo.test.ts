import { getMusicInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import { getSourceCodeDOMDocument } from "../utils";
const mockSourceCode = `
<div class="artwork">
<img alt="Donya" class="" src="https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg"></div>
<div class="songInfo">
<div class="song">testName</div>
<div class="artist">testArtistName</div></div>
<div class="rating">331,122,199 likes</div>
<div class="views">Plays: 107,541,122</div>
<div class="dateAdded">Date Added: Aug 22, 2022</div>
<div id="download" class="watch">
<a href="/videos/video/donya-bye-bye-bye" class="button textButton">
<i class="fa fa-video-camera">&nbsp;&nbsp;Video</i></a></div>
`;
describe("Get music info", () => {
    test("Get music info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getMusicInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "donya-bye-bye-bye",
            title: "testName",
            artist: "testArtistName",
            likes: 331122199,
            plays: 107541122,
            artwork:
                "https://assets.rjassets.com/static/mp3/donya-bye-bye-bye/8f00d1ab6a8c19a.jpg",
            date: new Date("Aug 22, 2022"),
            video: "https://www.radiojavan.com/videos/video/donya-bye-bye-bye",
        });
    });
});
