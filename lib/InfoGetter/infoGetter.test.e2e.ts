import { getMusicInfo, getVideoInfo } from ".";
describe("Info getters", () => {
    jest.setTimeout(15000);
    test("Should return music info with url", async () => {
        const info = await getMusicInfo(
            "https://www.radiojavan.com/mp3s/mp3/Koorosh-Abnormal-(Ft-Arta-Montiego)"
        );
        const staticInfo = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            artwork: info.artwork,
            video: info.video,
        };
        expect(staticInfo).toStrictEqual({
            id: "koorosh-abnormal-(ft-arta-montiego)",
            title: "Abnormal (Ft Arta & Montiego)",
            artist: "Koorosh",
            date: new Date("Jun 4, 2019"),
            url: "https://radiojavan.com/mp3s/mp3/Koorosh-Abnormal-(Ft-Arta-Montiego)",
            artwork:
                "https://assets.rjassets.com/static/mp3/koorosh-abnormal-(ft-arta-montiego)/1e3cd7f1402539b.jpg",
            video: "https://www.radiojavan.com/videos/video/koorosh-abnormal-(ft-arta-montiego)",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
    });
    test("Should return video info with url", async () => {
        const info = await getVideoInfo(
            "https://www.radiojavan.com/videos/video/koorosh-abnormal-(ft-arta-montiego)"
        );
        const staticInfo = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            thumbnail: info.thumbnail,
        };
        expect(staticInfo).toStrictEqual({
            id: "koorosh-abnormal-(ft-arta-montiego)",
            title: "Abnormal (Ft Arta & Montiego)",
            artist: "Koorosh",
            date: new Date("Sep 21, 2019"),
            url: "https://radiojavan.com/videos/video/koorosh-abnormal-(ft-arta-montiego)",
            thumbnail:
                "https://assets.rjassets.com/static/musicvideos/images/cad8a3f0821dc46-original-larger.jpeg",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
    });
});
