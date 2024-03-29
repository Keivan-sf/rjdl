import { LinkType } from "../interfaces";
import { formatURL, getTypeFromValidURL } from "./index";

describe("Radio javan link type utils", () => {
    describe("Get valid link", () => {
        test("Should get the core url with https+www", () => {
            expect(formatURL("https://www.play.radiojavan.com/")).toBe(
                "https://play.radiojavan.com/"
            );
        });
        test("Should get the core url with https", () => {
            expect(formatURL("https://play.radiojavan.com/")).toBe(
                "https://play.radiojavan.com/"
            );
        });
        test("Should get the core url with http", () => {
            expect(formatURL("http://play.radiojavan.com/")).toBe(
                "https://play.radiojavan.com/"
            );
        });
        test("Should get the core url without prefix", () => {
            expect(formatURL("play.radiojavan.com/")).toBe(
                "https://play.radiojavan.com/"
            );
        });
        test("Should get a random url with the origin of RadioJavan", () => {
            expect(formatURL("https://www.play.radiojavan.com/random")).toBe(
                "https://play.radiojavan.com/random"
            );
        });
        test("Should validate url with origin of rj.app", () => {
            expect(formatURL("https://rj.app/m/nv0a9WYE")).toBe(
                "https://rj.app/m/nv0a9WYE"
            );
        });
        test("Should format a url with origin of rj.app wo prefix", () => {
            expect(formatURL("rj.app/m/nv0a9WYE")).toBe(
                "https://rj.app/m/nv0a9WYE"
            );
        });
        test("Should format a url with origin of rj.app wo prefix and with www", () => {
            expect(formatURL("www.rj.app/m/nv0a9WYE")).toBe(
                "https://rj.app/m/nv0a9WYE"
            );
        });
    });
    describe("Link Type Identifier", () => {
        test("Should return music type", () => {
            const type = getTypeFromValidURL(
                "https://www.play.radiojavan.com/song/Anita-Nafas"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should return music type without prefixes", () => {
            const type = getTypeFromValidURL(
                "play.radiojavan.com/song/Anita-Nafas"
            );
            expect(type).toBe(LinkType.Music);
        });
        test("Should return video type", () => {
            const type = getTypeFromValidURL(
                "https://www.play.radiojavan.com/video/puzzle-shab-neshin"
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
                "https://www.play.radiojavan.com/podcast/Abo-Atash-123"
            );
            expect(type).toBe(LinkType.Podcast);
        });
        test("Should return playlist type", () => {
            const type = getTypeFromValidURL(
                "https://www.play.radiojavan.com/playlist/mp3/1249011caf74"
            );
            expect(type).toBe(LinkType.Playlist);
        });
        test("Should return Tv type", () => {
            const type = getTypeFromValidURL(
                "https://www.play.radiojavan.com/tv"
            );
            expect(type).toBe(LinkType.TV);
        });
        test("Should return album type", () => {
            const type = getTypeFromValidURL(
                "https://www.play.radiojavan.com/album/Koorosh-420/"
            );
            expect(type).toBe(LinkType.Album);
        });
        test("Should return rj.app music type", () => {
            const type = getTypeFromValidURL("https://rj.app/m/nv0a9WYE");
            expect(type).toBe(LinkType.Music);
        });
        test("Should return rj.app podcast type", () => {
            const type = getTypeFromValidURL("https://rj.app/p/br3gnprw");
            expect(type).toBe(LinkType.Podcast);
        });
        test("Should return rj.app album type", () => {
            const type = getTypeFromValidURL("https://rj.app/ma/D18eAKwY");
            expect(type).toBe(LinkType.Album);
        });
        test("Should return rj.app playlist type", () => {
            const type = getTypeFromValidURL("rj.app/pm/RjVqX8X4");
            expect(type).toBe(LinkType.Playlist);
        });
        test("Should return rj.app video type", () => {
            const type = getTypeFromValidURL("https://rj.app/v/dP5nz3NO");
            expect(type).toBe(LinkType.Video);
        });
    });
});
