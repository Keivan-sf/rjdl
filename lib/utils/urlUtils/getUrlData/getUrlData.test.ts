import {
    getMusicNameFromURL,
    getVideoNameFromURL,
    getAlbumNameFromURL,
    getIdFromPlaylistURL,
    getIDFromPlaylistTrackURL,
    getPodcastNameFromURL,
} from "./index";
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
