import { validateURL } from ".";

describe("Url utils", () => {
    describe("Url validation", () => {
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
        test("Should validate rj.app links", () => {
            expect(validateURL("https://rj.app/m/2qKkkB8q")).toBe(true);
        });
        test("Should validate rj.app links", () => {
            expect(validateURL("rj.app/m/2qKkkB8q")).toBe(true);
        });
        test("Should validate rj.app link and return false", () => {
            expect(validateURL("https://rj.app/")).toBe(false);
        });
    });
});
