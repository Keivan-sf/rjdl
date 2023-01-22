import {
    getMusicIdFromURL,
    getVideoIdFromURL,
    getAlbumIdFromURL,
    getIdFromPlaylistURL,
    getPodcastIdFromURL,
} from "./index";
describe("Id extractor", () => {
    test("Should return music id", () => {
        const id = getMusicIdFromURL(
            "https://play.radiojavan.com/song/the-don-saaghi-(ft-koorosh)/"
        );
        expect(id).toBe("the-don-saaghi-(ft-koorosh)");
    });
    test("Should throw with invalid music link", () => {
        expect(() => getMusicIdFromURL("bla")).toThrow();
    });
    test("Should return music id", () => {
        const id = getMusicIdFromURL(
            "https://www.play.radiojavan.com/song/the-don-saaghi-(ft-koorosh)"
        );
        expect(id).toBe("the-don-saaghi-(ft-koorosh)");
    });
    test("Should return music id with query-included url", () => {
        const id = getMusicIdFromURL(
            "https://play.radiojavan.com/song/the-don-saaghi-(ft-koorosh)?start=109320&index=2"
        );
        expect(id).toBe("the-don-saaghi-(ft-koorosh)");
    });
    test("Should return the video id", () => {
        const id = getVideoIdFromURL(
            "https://play.radiojavan.com/video/parsalip-100-(ft-rudebeny)"
        );
        expect(id).toBe("parsalip-100-(ft-rudebeny)");
    });
    test("should return the album id", () => {
        const id = getAlbumIdFromURL(
            "https://play.radiojavan.com/album/sepehr-khalse-yadegari"
        );
        expect(id).toBe("sepehr-khalse-yadegari");
    });
    test("Should return the playlistID from playlist url", () => {
        const id = getIdFromPlaylistURL(
            "https://play.radiojavan.com/playlist/mp3/c3cf0d8a9baa/"
        );
        expect(id).toBe("c3cf0d8a9baa");
    });
    test("Should return the podcast id from url", () => {
        const id = getPodcastIdFromURL(
            "https://play.radiojavan.com/podcast/dynatomix-47"
        );
        expect(id).toBe("dynatomix-47");
    });
});
