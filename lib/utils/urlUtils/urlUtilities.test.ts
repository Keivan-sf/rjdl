import { Types } from "../../interfaces/urlInterfaces";
import { getRadioJavanLink, getLinkType } from "./validateLink";

describe("Radio javan url utils", () => {
    describe("Radio Javan Link validator", () => {
        test("Should get the core url with https+www", () => {
            expect(getRadioJavanLink("https://www.radiojavan.com/")).toBe(
                "https://www.radiojavan.com/"
            );
        });
        test("Should get the core url with https", () => {
            expect(getRadioJavanLink("https://radiojavan.com/")).toBe(
                "https://radiojavan.com/"
            );
        });
        test("Should get the core url with http", () => {
            expect(getRadioJavanLink("http://radiojavan.com/")).toBe(
                "http://radiojavan.com/"
            );
        });
        test("Should get the core url without prefix", () => {
            expect(getRadioJavanLink("radiojavan.com/")).toBe(
                "radiojavan.com/"
            );
        });
        test("Should get a random url with the origin of RadioJavan", () => {
            expect(getRadioJavanLink("https://www.radiojavan.com/random")).toBe(
                "https://www.radiojavan.com/random"
            );
        });
    });
    describe("Radio Javan Link Type Identifier", () => {
        test("Should return music type", () => {
            const type = getLinkType(
                "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas",
                type: Types.Music,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return music type without prefixes", () => {
            const type = getLinkType("radiojavan.com/mp3s/mp3/Anita-Nafas");
            const expected = {
                link: "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas",
                type: Types.Music,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return video type", () => {
            const type = getLinkType(
                "https://www.radiojavan.com/videos/video/puzzle-shab-neshin"
            );
            const expected = {
                link: "https://www.radiojavan.com/videos/video/puzzle-shab-neshin",
                type: Types.Video,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should throw invalid type", () => {
            expect(() => getLinkType("test/video/puzzle-shab-neshin")).toThrow(
                "INVALID_TYPE"
            );
        });
        test("Should return podcast type", () => {
            const type = getLinkType(
                "https://www.radiojavan.com/podcasts/podcast/Abo-Atash-123"
            );
            const expected = {
                link: "https://www.radiojavan.com/podcasts/podcast/Abo-Atash-123",
                type: Types.Podcast,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return playlist type", () => {
            const type = getLinkType(
                "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74"
            );
            const expected = {
                link: "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74",
                type: Types.Playlist,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return Tv type", () => {
            const type = getLinkType("https://www.radiojavan.com/tv");
            const expected = {
                link: "https://www.radiojavan.com/tv",
                type: Types.TV,
            };
            expect(type).toStrictEqual(expected);
        });
    });
});
