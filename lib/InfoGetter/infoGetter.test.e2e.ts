import { getMusicInfo, getVideoInfo } from ".";
describe("Info getters", () => {
    jest.setTimeout(15000);
    test("Should return music info with url", async () => {
        const info = await getMusicInfo(
            "https://www.radiojavan.com/mp3s/mp3/Sogand-Daad-Nazan"
        );
        const staticInfo = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            artwork: info.artwork,
        };
        expect(staticInfo).toStrictEqual({
            id: "sogand-daad-nazan",
            title: "Daad Nazan",
            artist: "Sogand",
            date: new Date("Aug 11, 2022"),
            url: "https://radiojavan.com/mp3s/mp3/Sogand-Daad-Nazan",
            artwork:
                "https://assets.rjassets.com/static/mp3/sogand-daad-nazan/d94422270015b20.jpg",
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
        };
        expect(staticInfo).toStrictEqual({
            id: "koorosh-abnormal-(ft-arta-montiego)",
            title: "Abnormal (Ft Arta & Montiego)",
            artist: "Koorosh",
            date: new Date("Sep 21, 2019"),
            url: "https://radiojavan.com/videos/video/koorosh-abnormal-(ft-arta-montiego)",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
    });
});
