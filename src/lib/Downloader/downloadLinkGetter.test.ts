import {
    getMusicDownloadLinksViaID,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaID,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaID,
    getVideoDownloadLinksViaURL,
} from ".";
import * as hostGetters from "./getHost";
import * as idGetters from "./getId";
jest.mock("./getHost", () => ({
    getMusicHost: () => Promise.resolve("https://host2.rj-mw1.com"),
    getPodcastHost: () => Promise.resolve("https://host2.rj-mw1.com"),
    getVideoHost: () => Promise.resolve("https://host2.rj-mw1.com"),
}));
jest.mock("./getId", () => ({
    getMusicID: (url: string) => Promise.resolve(url.split("/").pop()),
    getVideoID: (url: string) => url.split("/").pop(),
    getPodcastID: (url: string) => url.split("/").pop(),
}));
describe("Get download link", () => {
    describe("Get download links via id", () => {
        test("Get music download links via id", async () => {
            const links = await getMusicDownloadLinksViaID("test-id");
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/mp3/mp3-256/test-id.mp3",
                highQuality:
                    "https://host2.rj-mw1.com/media/mp3/mp3-320/test-id.mp3",
            });
        });
        test("Get podcast download links via id", async () => {
            const links = await getPodcastDownloadLinksViaID("test-id");
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-256/test-id.mp3",
                highQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-320/test-id.mp3",
            });
        });
        test("Get video download links via id", async () => {
            const links = await getVideoDownloadLinksViaID("test-id");
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/music_video/lq/test-id.mp4",
                highQuality:
                    "https://host2.rj-mw1.com/media/music_video/hq/test-id.mp4",
            });
        });
    });
    describe("get download links via url", () => {
        test("Get music download links via url", async () => {
            const links = await getMusicDownloadLinksViaURL(
                "https://radiojavan.com/mp3s/mp3/test-id-2"
            );
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/mp3/mp3-256/test-id-2.mp3",
                highQuality:
                    "https://host2.rj-mw1.com/media/mp3/mp3-320/test-id-2.mp3",
            });
        });
        test("Get video download links via url", async () => {
            const links = await getVideoDownloadLinksViaURL(
                "https://www.radiojavan.com/videos/video/donya-bye-bye-bye"
            );
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/music_video/lq/donya-bye-bye-bye.mp4",
                highQuality:
                    "https://host2.rj-mw1.com/media/music_video/hq/donya-bye-bye-bye.mp4",
            });
        });
        test("Get podcast download links via url", async () => {
            const links = await getPodcastDownloadLinksViaURL(
                "https://www.radiojavan.com/podcasts/podcast/TranceForm-114"
            );
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-256/TranceForm-114.mp3",
                highQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-320/TranceForm-114.mp3",
            });
        });
    });
});