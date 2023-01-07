import { Readable } from "stream";
import {
    downloadMusicViaID,
    downloadPodcastViaID,
    downloadVideoViaID,
    getMusicDownloadLinksViaID,
    getPodcastDownloadLinksViaID,
    getVideoDownloadLinksViaID,
} from "./utils";
import {
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
    downloadMusicViaURL,
    downloadPodcastViaURL,
    downloadVideoViaURL,
} from ".";

jest.mock("./utils/getHost", () => ({
    getMusicHost: () => Promise.resolve("https://host2.rj-mw1.com"),
    getPodcastHost: () => Promise.resolve("https://host2.rj-mw1.com"),
    getVideoHost: () => Promise.resolve("https://host2.rj-mw1.com"),
}));
jest.mock("./utils/getId", () => ({
    getMusicID: (url: string) => Promise.resolve(url.split("/").pop()),
    getVideoID: (url: string) => url.split("/").pop(),
    getPodcastID: (url: string) => url.split("/").pop(),
}));
jest.mock("./utils/getStreamFromUrl", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Readable } = require("stream");
    return {
        getReadableStreamFromUrl: (id: string) =>
            Promise.resolve(new Readable()),
    };
});
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
                    "https://host2.rj-mw1.com/media/podcast/mp3-192/test-id.mp3",
                highQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-320/test-id.mp3",
            });
        });
        test("Get podcast download links via url", async () => {
            const links = await getPodcastDownloadLinksViaURL(
                "https://www.radiojavan.com/podcasts/podcast/TranceForm-114"
            );
            expect(links).toStrictEqual({
                midQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-192/TranceForm-114.mp3",
                highQuality:
                    "https://host2.rj-mw1.com/media/podcast/mp3-320/TranceForm-114.mp3",
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
    describe("Download via id", () => {
        test("Should return readable stream for music", async () => {
            const stream = await downloadMusicViaID("test-id");
            expect(stream instanceof Readable).toBe(true);
        });
        test("Should return readable stream for video", async () => {
            const stream = await downloadVideoViaID("test-id");
            expect(stream instanceof Readable).toBe(true);
        });
        test("Should return readable stream for music", async () => {
            const stream = await downloadPodcastViaID("test-id");
            expect(stream instanceof Readable).toBe(true);
        });
    });
    describe("Download via url", () => {
        test("Should return readable stream for music", async () => {
            const stream = await downloadMusicViaURL("test-url");
            expect(stream instanceof Readable).toBe(true);
        });
        test("Should return readable stream for video", async () => {
            const stream = await downloadVideoViaURL("test-url");
            expect(stream instanceof Readable).toBe(true);
        });
        test("Should return readable stream for music", async () => {
            const stream = await downloadPodcastViaURL("test-url");
            expect(stream instanceof Readable).toBe(true);
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
    });
});
