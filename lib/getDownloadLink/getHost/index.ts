import axios from "axios";
import { DownloadableTypes } from "../interfaces";

const hostProviders: { [key in DownloadableTypes]: string } = {
    Music: "https://www.radiojavan.com/mp3s/mp3_host",
    Video: "https://www.radiojavan.com/videos/video_host",
    Podcast: "https://www.radiojavan.com/podcasts/podcast_host",
};

export const getMusicHost = (id: string): Promise<string> =>
    getHost(id, "Music");

export const getVideoHost = (id: string): Promise<string> =>
    getHost(id, "Video");

export const getPodcastHost = (id: string): Promise<string> =>
    getHost(id, "Podcast");

async function getHost(id: string, type: DownloadableTypes) {
    const response = await axios.post(hostProviders[type], { id });
    if (!response.data.host) throw new Error("ERR_GETTING_HOST");
    return response.data.host as string;
}
