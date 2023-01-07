import axios from "axios";
import { Readable } from "stream";

export const getReadableStreamFromUrl = async (
    url: string
): Promise<Readable> => {
    const response = await axios({
        method: "get",
        url,
        responseType: "stream",
    });
    return response.data as Readable;
};
