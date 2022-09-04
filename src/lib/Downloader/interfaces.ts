export type DownloadableTypes = "Music" | "Video" | "Podcast";
export type DownloadLinks = { midQuality: string; highQuality: string };

/**
 * @typedef DownloadLinks
 * @prop {string} midQuality
 * Middle quality download link
 *
 * For musics and podcasts it's `256`
 * @prop {string} highQuality
 * high quality download link
 *
 * For musics and podcasts it's `320`
 */
