import { getMusicDownloadLinksViaID } from ".";
import * as hostGetters from "./getHost";
jest.mock("./getHost", () => ({
    getMusicHost: () => Promise.resolve("https://host2.rj-mw1.com"),
}));
describe("Get download link", () => {
    test("Get music download links via id", async () => {
        const links = await getMusicDownloadLinksViaID("test-id");
        expect(links).toStrictEqual({
            midQuality:
                "https://host2.rj-mw1.com/media/mp3/mp3-256/test-id.mp3",
            highQuality:
                "https://host2.rj-mw1.com/media/mp3/mp3-320/test-id.mp3",
        });
    });
});
