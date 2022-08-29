import { validateURL } from "..";
import { LinkTypes } from "../interfaces";
import { getRadioJavanLink, getTypeFromValidURL } from "./index";

describe("Radio javan link type utils", () => {
    describe("Get valid link", () => {
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
    describe("Link Type Identifier", () => {
        test("Should return music type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas/",
                type: LinkTypes.Music,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return music type without prefixes", () => {
            const type = getTypeFromValidURL(
                "radiojavan.com/mp3s/mp3/Anita-Nafas"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/mp3/Anita-Nafas/",
                type: LinkTypes.Music,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return video type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/videos/video/puzzle-shab-neshin"
            );
            const expected = {
                link: "https://www.radiojavan.com/videos/video/puzzle-shab-neshin/",
                type: LinkTypes.Video,
            };
            expect(type).toStrictEqual(expected);
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
            const expected = {
                link: "https://www.radiojavan.com/podcasts/podcast/Abo-Atash-123/",
                type: LinkTypes.Podcast,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return playlist type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74"
            );
            const expected = {
                link: "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74/",
                type: LinkTypes.Playlist,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should Playlist Track type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=0/"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=0/",
                type: LinkTypes.PlaylistTrack,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should Playlist Track type without slash", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=0"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=0/",
                type: LinkTypes.PlaylistTrack,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return Tv type", () => {
            const type = getTypeFromValidURL("https://www.radiojavan.com/tv");
            const expected = {
                link: "https://www.radiojavan.com/tv/",
                type: LinkTypes.TV,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return album type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420/"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/album/Koorosh-420/",
                type: LinkTypes.Album,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return Album Track type", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3/"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3/",
                type: LinkTypes.AlbumTrack,
            };
            expect(type).toStrictEqual(expected);
        });
        test("Should return Album Track type without slash", () => {
            const type = getTypeFromValidURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3/"
            );
            const expected = {
                link: "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3/",
                type: LinkTypes.AlbumTrack,
            };
            expect(type).toStrictEqual(expected);
        });
    });
});
