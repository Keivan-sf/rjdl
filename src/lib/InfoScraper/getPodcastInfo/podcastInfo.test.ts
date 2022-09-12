import { getPodcastInfoFromDOM } from ".";
import { JSDOM } from "jsdom";
const mockSourceCode = `
<div class="artwork">
<img alt="Releji - 'TranceForm 114'" class="cover" src="https://assets.rjassets.com/static/podcasts/tranceform-114/59c077fed000038.jpg">
<div class="songInfo">
<span class="artist">TranceForm 114</span>
<span class="song">Releji</span>
</div>
</div>
<span class="rating">123 likes</span>
<div class="mp3Description">
<div class="views">Plays: 33,641</div>
<div pubdate="pubdate" class="dateAdded">Date added: Sep 1, 2022</div>
</div>
`;
describe("Get podcast info", () => {
    test("Get podcast info from dom", () => {
        const DOM = new JSDOM(mockSourceCode).window.document;
        const results = getPodcastInfoFromDOM(DOM);
        expect(results).toStrictEqual({
            id: "tranceform-114",
            title: "TranceForm 114",
            artist: "Releji",
            likes: 123,
            plays: 33641,
            artwork:
                "https://assets.rjassets.com/static/podcasts/tranceform-114/59c077fed000038.jpg",
            date: new Date("Sep 1, 2022"),
        });
    });
});
