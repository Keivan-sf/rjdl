import { formatURL, getLinkType, validateURL } from "./lib/utils/urlUtils";
import {
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
} from "./lib/DownloadLinkGetter";

export {
    formatURL,
    getLinkType,
    validateURL,
    getMusicDownloadLinksViaURL,
    getPodcastDownloadLinksViaURL,
    getVideoDownloadLinksViaURL,
};
export * from "./lib/InfoGetter/interfaces";
export * from "./lib/InfoGetter";
export { LinkType } from "./lib/utils/urlUtils/interfaces";
