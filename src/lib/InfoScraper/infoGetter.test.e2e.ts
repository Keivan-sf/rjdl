import { getMusicInfo, getPodcastInfo, getVideoInfo } from ".";
import { PodcastInfo, MusicInfo, VideoInfo } from "./interfaces";
describe("Info getters", () => {
    jest.setTimeout(15000);
    test("Should return music info with url", async () => {
        const info = await getMusicInfo(
            "https://play.radiojavan.com/song/wantons-boome-naghashi"
        );
        const staticInfo: Partial<MusicInfo> = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            artwork: info.artwork,
        };
        expect(staticInfo).toStrictEqual({
            id: "Wantons-Boome-Naghashi",
            title: "Boome Naghashi",
            artist: "Wantons",
            date: new Date("Nov 24, 2018"),
            url: "https://play.radiojavan.com/song/wantons-boome-naghashi",
            artwork:
                "https://assets.rjassets.com/static/mp3/wantons-boome-naghashi/1e884d210774864.jpg",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
        expect(Array.isArray(info.relatedTracks)).toBe(true);
        expect(typeof info.relatedTracks[0].title).toBe("string");
    });
    test("Should return video info with url", async () => {
        const info = await getVideoInfo(
            "https://play.radiojavan.com/video/koorosh-abnormal-(ft-arta-montiego)"
        );
        const staticInfo: Partial<VideoInfo> = {
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
            url: "https://play.radiojavan.com/video/koorosh-abnormal-(ft-arta-montiego)",
            thumbnail:
                "https://assets.rjassets.com/static/musicvideos/images/cad8a3f0821dc46-original-larger.jpeg",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
        expect(Array.isArray(info.relatedVideos)).toBe(true);
        expect(typeof info.relatedVideos[0].title).toBe("string");
    });
    test("Should return podcast info with url", async () => {
        const info = await getPodcastInfo(
            "https://play.radiojavan.com/podcast/naab-10"
        );
        const staticInfo: Partial<PodcastInfo> = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            artwork: info.artwork,
        };

        expect(staticInfo).toStrictEqual({
            id: "Naab-10",
            title: "Naab 10",
            artist: "DJ Shahin",
            date: new Date("Jan 9, 2023"),
            url: "https://play.radiojavan.com/podcast/naab-10",
            artwork:
                "https://assets.rjassets.com/static/podcasts/naab-10/89229ca872e593c.jpg",
        });

        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
        expect(Array.isArray(info.relatedTracks)).toBe(true);
        expect(typeof info.relatedTracks[0].title).toBe("string");
    });

    test("Should get podcast info with app url", async () => {
        const info = await getPodcastInfo("https://rj.app/p/VrWJLPxN");
        const staticInfo: Partial<PodcastInfo> = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            artwork: info.artwork,
        };

        expect(staticInfo).toStrictEqual({
            id: "Abo-Atash-123",
            title: "Abo Atash 123",
            artist: "DJ Taba",
            date: new Date("Aug 7, 2022"),
            url: "https://rj.app/p/VrWJLPxN",
            artwork:
                "https://assets.rjassets.com/static/podcasts/abo-atash-123/3d06b3737b376b1.jpg",
        });

        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
        expect(Array.isArray(info.relatedTracks)).toBe(true);
        expect(typeof info.relatedTracks[0].title).toBe("string");
    });
});
