import {
    getMusicIdFromURL,
    getVideoIdFromURL,
    getAlbumIdFromURL,
    getIdFromPlaylistURL,
    getIdFromPlaylistTrackURL,
    getPodcastIdFromURL,
} from "./index";
describe("Id extractor", () => {
    test("Should return music id", () => {
        const id = getMusicIdFromURL(
            "https://www.radiojavan.com/mp3s/mp3/Sogand-Tehran"
        );
        expect(id).toBe("Sogand-Tehran");
    });
    test("Should throw with invalid music link", () => {
        expect(() => getMusicIdFromURL("bla")).toThrow();
    });
    test("Should return music id", () => {
        const id = getMusicIdFromURL(
            "https://www.radiojavan.com/mp3s/mp3/Sogand-Tehran"
        );
        expect(id).toBe("Sogand-Tehran");
    });
    test("Should return music id with query-included url", () => {
        const id = getMusicIdFromURL(
            "https://www.radiojavan.com/mp3s/mp3/Sogand-Baroon?start=109320&index=2"
        );
        expect(id).toBe("Sogand-Baroon");
    });
    test("Should return the video id", () => {
        const id = getVideoIdFromURL(
            "https://www.radiojavan.com/videos/video/donya-bye-bye-bye"
        );
        expect(id).toBe("donya-bye-bye-bye");
    });
    test("should return the album id", () => {
        const id = getAlbumIdFromURL(
            "https://www.radiojavan.com/mp3s/album/Koorosh-420"
        );
        expect(id).toBe("Koorosh-420");
    });
    test("Should return the album id from albumTrack", () => {
        const id = getAlbumIdFromURL(
            "https://www.radiojavan.com/mp3s/album/Koorosh-420?index=3"
        );
        expect(id).toBe("Koorosh-420");
    });
    test("Should return the playlistID from playlist url", () => {
        const id = getIdFromPlaylistURL(
            "https://www.radiojavan.com/playlists/playlist/mp3/1249011caf74"
        );
        expect(id).toBe("1249011caf74");
    });
    test("Should return the playlistID from playlistTrack url", () => {
        const id = getIdFromPlaylistTrackURL(
            "https://www.radiojavan.com/mp3s/playlist_start?id=1249011caf74&index=2"
        );
        expect(id).toBe("1249011caf74");
    });
    test("Should return the podcast id from url", () => {
        const id = getPodcastIdFromURL(
            "https://www.radiojavan.com/podcasts/podcast/Dubways-133"
        );
        expect(id).toBe("Dubways-133");
    });
    test("Should return the podcast id from related PodcastUrl", () => {
        const id = getPodcastIdFromURL(
            "https://www.radiojavan.com/podcasts/podcast/Dubways-129?start=3594&index=4"
        );
        expect(id).toBe("Dubways-129");
    });
});
