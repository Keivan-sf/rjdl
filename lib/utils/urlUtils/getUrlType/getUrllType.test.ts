import { LinkType } from "../interfaces";
import { formatURL, getTypeFromValidURL } from "./index";

describe("Radio javan link type utils", () => {
    describe("Get valid link", () => {
        test("Should get the core url with https+www", () => {
            expect(formatURL("https://www.radiojavan.com/")).toBe(
                "https://radiojavan.com/"
            );
        });
        test("Should get the core url with https", () => {
            expect(formatURL("https://radiojavan.com/")).toBe(
                "https://radiojavan.com/"
            );
        });
        test("Should get the core url with http", () => {
            expect(formatURL("http://radiojavan.com/")).toBe(
                "https://radiojavan.com/"
            );
        });
        test("Should get the core url without prefix", () => {
            expect(formatURL("radiojavan.com/")).toBe(
                "https://radiojavan.com/"
            );
        });
        test("Should get a random url with the origin of RadioJavan", () => {
            expect(formatURL("https://www.radiojavan.com/random")).toBe(
                "https://radiojavan.com/random"
            );
        });
    });
    describe("Link Type Identifier", () => {
        test("Should return music type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should return music type without prefixes", () => {
            const type = getTypeFromValidURL(
                "radiojavan.com/mp3s/mp3/Anita-Nafas"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should return video type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/videos/video/puzzle-shab-neshin"
            );
            expect(type).toBe(LinkType.Video);
        });
        test("Should throw invalid type", () => {
            expect(() =>
                getTypeFromValidURL("test/video/puzzle-shab-neshin")
            ).toThrow("INVALID_TYPE");
        });
        test("Should return podcast type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/podcasts/podcast/Abo-Atash-123"
            );
            expect(type).toBe(LinkType.Podcast);
        });
        test("Should return playlist type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74"
            );
            expect(type).toBe(LinkType.Playlist);
        });
        test("Should Playlist Track type as Music", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=0/"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should Playlist Track type as Music without slash", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=0"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should return Tv type", () => {
            const type = getTypeFromValidURL("https://www.radiojavan.com/tv");
            expect(type).toBe(LinkType.TV);
        });
        test("Should return album type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420/"
            );
            expect(type).toBe(LinkType.Album);
        });
        test("Should return Album Track type as Music", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3/"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should return Album Track type as Music without slash", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3/"
            );
            expect(type).toBe(LinkType.Music);
        });
    });
});
