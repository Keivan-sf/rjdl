import {
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
} from ".";

describe("Download link getter e2e test", () => {
    jest.setTimeout(10000);
    test("Should get music download link while id is available in url", async () => {
        const links = await getMusicDownloadLinksViaURL(
            "https://play.radiojavan.com/song/the-don-saaghi-(ft-koorosh)"
        );
        expect(links).toStrictEqual({
            midQuality:
                "https://host2.rj-mw1.com/media/mp3/mp3-256/the-don-saaghi-(ft-koorosh).mp3",
            highQuality:
                "https://host2.rj-mw1.com/media/mp3/mp3-320/the-don-saaghi-(ft-koorosh).mp3",
        });
    });
    test("Should get video download links", async () => {
        const links = await getVideoDownloadLinksViaURL(
            "https://play.radiojavan.com/video/hengameh-az-vaghti-rafti"
        );
        expect(links).toStrictEqual({
            midQuality:
                "https://host1.rj-mw1.com/media/music_video/lq/hengameh-az-vaghti-rafti.mp4",
            highQuality:
                "https://host1.rj-mw1.com/media/music_video/hq/hengameh-az-vaghti-rafti.mp4",
        });
    });
    test("Should get podcast download links", async () => {
        const links = await getPodcastDownloadLinksViaURL(
            "https://play.radiojavan.com/podcast/TranceForm-114"
        );
        expect(links).toStrictEqual({
            midQuality:
                "https://host2.rj-mw1.com/media/podcast/mp3-192/TranceForm-114.mp3",
            highQuality:
                "https://host2.rj-mw1.com/media/podcast/mp3-320/TranceForm-114.mp3",
        });
    });
    test("Should get download links of rj.app music", async () => {
        const links = await getMusicDownloadLinksViaURL(
            "https://rj.app/m/2qKkkB8q"
        );
        expect(links).toStrictEqual({
            midQuality:
                "https://host2.rj-mw1.com/media/mp3/mp3-256/Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha).mp3",
            highQuality:
                "https://host2.rj-mw1.com/media/mp3/mp3-320/Koorosh-Yebaram-Man-(Ft-Arta-Behzad-Leito-Raha).mp3",
        });
    });
    test("Should get download links of rj.app video", async () => {
        const links = await getVideoDownloadLinksViaURL(
            "https://rj.app/v/dP5nz3NO"
        );
        expect(links).toStrictEqual({
            midQuality:
                "https://host2.rj-mw1.com/media/music_video/lq/sahar-kavir-(live-in-istanbul).mp4",
            highQuality:
                "https://host2.rj-mw1.com/media/music_video/hq/sahar-kavir-(live-in-istanbul).mp4",
        });
    });
    test("Should get download links of rj.app podcast", async () => {
        const links = await getPodcastDownloadLinksViaURL(
            "https://rj.app/p/krQgdJ8N"
        );
        expect(links).toStrictEqual({
            midQuality:
                "https://host2.rj-mw1.com/media/podcast/mp3-192/Flybeat-3.mp3",
            highQuality:
                "https://host2.rj-mw1.com/media/podcast/mp3-320/Flybeat-3.mp3",
        });
    });
});
