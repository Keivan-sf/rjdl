import { formatURL, getLinkType, validateURL } from "./lib/utils/urlUtils";
import {
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
} from "./lib/Downloader";
import { DownloadLinks } from "./lib/Downloader/interfaces";

export {
    formatURL,
    getLinkType,
    validateURL,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
    DownloadLinks,
};
export * from "./lib/InfoScraper/interfaces";
export * from "./lib/InfoScraper";
export { LinkType } from "./lib/utils/urlUtils/interfaces";
