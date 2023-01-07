import axios from "axios";
import { Readable } from "stream";
import { getReadableStreamFromUrl } from ".";

jest.mock("axios", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Readable } = require("stream");
    return () =>
        Promise.resolve({
            data: new Readable(),
        });
});

describe("Readable stream from url", () => {
    test("should return a readable stream", async () => {
        const stream = await getReadableStreamFromUrl("urltest");
        expect(stream instanceof Readable).toBe(true);
    });
});
