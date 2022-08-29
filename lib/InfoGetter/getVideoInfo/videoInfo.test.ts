import { getVideoInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
const mockSourceCode = `
<div class="songInfo">
<span class="artist">Donya</span>
<span class="song">Bye Bye Bye</span>
<br><span class="artist farsiText" dir="rtl">دنیا</span>
<span class="song farsiText" dir="rtl">بای بای بای</span>
</div>
<div class="views">Plays: 538,580</div>
<span class="rating">12,487 likes</span>
<div pubdate="pubdate" class="date_added">Date added: Aug 27, 2022</div>
`;
describe("Get video info", () => {
    test("Get video info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getVideoInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            title: "Bye Bye Bye",
            artist: "Donya",
            likes: 12487,
            plays: 538580,
            date: new Date("Aug 27, 2022"),
        });
    });
});
