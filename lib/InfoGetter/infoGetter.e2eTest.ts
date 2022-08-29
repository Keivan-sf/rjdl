import { getMusicInfo } from ".";
describe("Info getters", () => {
    test("Should return music info with url", async () => {
        const info = await getMusicInfo(
            "https://www.radiojavan.com/mp3s/mp3/Sogand-Daad-Nazan"
        );
        const staticInfo = {
            name: info.name,
            artist: info.artist,
            date: info.date,
            url: info.url,
        };
        expect(staticInfo).toStrictEqual({
            name: "Daad Nazan",
            artist: "Sogand",
            date: new Date("Aug 11, 2022"),
            url: "https://www.radiojavan.com/mp3s/mp3/Sogand-Daad-Nazan",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
    });
});
