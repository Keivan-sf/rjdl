import { getMusicInfo, getPodcastInfo, getVideoInfo } from ".";
import { PodcastInfo, MusicInfo, VideoInfo } from "./interfaces";
describe("Info getters", () => {
    jest.setTimeout(15000);
    test("Should return music info with url", async () => {
        const info = await getMusicInfo(
            "https://www.radiojavan.com/mp3s/mp3/Koorosh-Abnormal-(Ft-Arta-Montiego)"
        );
        const staticInfo: Partial<MusicInfo> = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            artwork: info.artwork,
            video: info.video,
        };
        expect(staticInfo).toStrictEqual({
            id: "Koorosh-Abnormal-(Ft-Arta-Montiego)",
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
        const staticInfo: Partial<VideoInfo> = {
            id: info.id,
            title: info.title,
            artist: info.artist,
            date: info.date,
            url: info.url,
            thumbnail: info.thumbnail,
            song: info.song,
        };
        expect(staticInfo).toStrictEqual({
            id: "koorosh-abnormal-(ft-arta-montiego)",
            title: "Abnormal (Ft Arta & Montiego)",
            artist: "Koorosh",
            date: new Date("Sep 21, 2019"),
            url: "https://radiojavan.com/videos/video/koorosh-abnormal-(ft-arta-montiego)",
            thumbnail:
                "https://assets.rjassets.com/static/musicvideos/images/cad8a3f0821dc46-original-larger.jpeg",
            song: "https://www.radiojavan.com/mp3s/mp3/Koorosh-Abnormal-(Ft-Arta-Montiego)",
        });
        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
    });
    test("Should return podcast info with url", async () => {
        // https://www.radiojavan.com/podcasts/podcast/Dance-Station-35
        const info = await getPodcastInfo(
            "https://www.radiojavan.com/podcasts/podcast/Dance-Station-35"
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
            id: "dance-station-35",
            title: "Dance Station 35",
            artist: "Hosein Aerial",
            date: new Date("Sep 2, 2022"),
            url: "https://radiojavan.com/podcasts/podcast/Dance-Station-35",
            artwork:
                "https://assets.rjassets.com/static/podcasts/dance-station-35/05c1d5eb3e4303e.jpg",
        });

        expect(typeof info.likes).not.toBeNaN();
        expect(typeof info.likes).toBe("number");
        expect(typeof info.plays).not.toBeNaN();
        expect(typeof info.plays).toBe("number");
    });
});
