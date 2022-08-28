import { validateURL } from ".";
import { LinkTypes } from "../../interfaces/urlInterfaces";
import {
    getRadioJavanLink,
    getTypeFromValidURL,
    getMusicNameFromURL,
    getVideoNameFromURL,
    getAlbumNameFromURL,
    getIdFromPlaylistURL,
    getIDFromPlaylistTrackURL,
    getPodcastNameFromURL,
} from "./extractLinkData";

describe("Radio javan url utils", () => {
    describe("Link validator", () => {
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
        test("Should validate the link and return true", () => {
            expect(
                validateURL("https://www.radiojavan.com/mp3s/mp3/Anita-Nafas")
            ).toBe(true);
        });
        test("Should validate the link and return true", () => {
            expect(
                validateURL(
                    "radiojavan.com/playlists/playlist/mp3/1249011caf74"
                )
            ).toBe(true);
        });
        test("Should validate the link and return false", () => {
            expect(validateURL("https://www.radiojavan.com/")).toBe(false);
        });
        test("Should validate the link and return false", () => {
            expect(validateURL("ss")).toBe(false);
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
    describe("Name extractor", () => {
        test("Should return music name", () => {
            const name = getMusicNameFromURL(
                "https://www.radiojavan.com/mp3s/mp3/Sogand-Tehran"
            );
            expect(name).toBe("Sogand-Tehran");
        });
        test("Should throw with invalid music link", () => {
            expect(() => getMusicNameFromURL("bla")).toThrow();
        });
        test("Should return music name", () => {
            const name = getMusicNameFromURL(
                "https://www.radiojavan.com/mp3s/mp3/Sogand-Tehran"
            );
            expect(name).toBe("Sogand-Tehran");
        });
        test("Should return music name with query-included url", () => {
            const name = getMusicNameFromURL(
                "https://www.radiojavan.com/mp3s/mp3/Sogand-Baroon?start=109320&index=2"
            );
            expect(name).toBe("Sogand-Baroon");
        });
        test("Should return the video name", () => {
            const name = getVideoNameFromURL(
                "https://www.radiojavan.com/videos/video/donya-bye-bye-bye"
            );
            expect(name).toBe("donya-bye-bye-bye");
        });
        test("should return the album name", () => {
            const name = getAlbumNameFromURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420"
            );
            expect(name).toBe("Koorosh-420");
        });
        test("Should return the album name from albumTrack", () => {
            const name = getAlbumNameFromURL(
                "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3"
            );
            expect(name).toBe("Koorosh-420");
        });
        test("Should return the playlistID from playlist url", () => {
            const name = getIdFromPlaylistURL(
                "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74"
            );
            expect(name).toBe("1249011caf74");
        });
        test("Should return the playlistID from playlistTrack url", () => {
            const name = getIDFromPlaylistTrackURL(
                "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=2"
            );
            expect(name).toBe("1249011caf74");
        });
        test("Should return the podcast name from url", () => {
            const name = getPodcastNameFromURL(
                "https://www.radiojavan.com/podcasts/podcast/Dubways-133"
            );
            expect(name).toBe("Dubways-133");
        });
        test("Should return the podcast name from related PodcastUrl", () => {
            const name = getPodcastNameFromURL(
                "https://www.radiojavan.com/podcasts/podcast/Dubways-129?start=3594&index=4"
            );
            expect(name).toBe("Dubways-129");
        });
    });
});
