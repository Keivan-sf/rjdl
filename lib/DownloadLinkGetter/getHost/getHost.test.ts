import axios from "axios";
import * as hostGetters from ".";
jest.mock("axios", () => ({
    post: (url: string, data: { id: string }) =>
        new Promise((resolve) => {
            let host;
            if (data.id.startsWith("music")) host = "https://musicHost.com";
            if (data.id.startsWith("video")) host = "https://videoHost.com";
            if (data.id.startsWith("podcast")) host = "https://podcastHost.com";
            resolve({ data: { host } });
        }),
}));

describe("Host getters", () => {
    test("Should return https://musicHost.com", async () => {
        const host = await hostGetters.getMusicHost("music_1");
        expect(host).toBe("https://musicHost.com");
    });
    test("Should return https://videoHost.com", async () => {
        const host = await hostGetters.getVideoHost("video_1");
        expect(host).toBe("https://videoHost.com");
    });
    test("Should return https://podcastHost.com", async () => {
        const host = await hostGetters.getVideoHost("podcast_1");
        expect(host).toBe("https://podcastHost.com");
    });
});
