import { getMusicInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
import { getSourceCodeDOMDocument } from "../utils";
const mockSourceCode = `
<div class="songInfo">
    <div class="song">testName</div>
    <div class="artist">testArtistName</div>
</div>
<div class="rating">331,122,199 likes</div>
<div class="views">Plays: 107,541,122</div>
<div class="dateAdded">Date Added: Aug 22, 2022</div>
`;
describe("Get music info", () => {
    test("Get music info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getMusicInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            title: "testName",
            artist: "testArtistName",
            likes: 331122199,
            plays: 107541122,
            date: new Date("Aug 22, 2022"),
        });
    });
});
