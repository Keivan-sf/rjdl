import { DownloadLinks } from "./Downloader/interfaces";
import { MusicInfo, PodcastInfo, VideoInfo } from "./InfoScraper/interfaces";

export interface Music extends MusicInfo {
    getDownloadLinks(): Promise<DownloadLinks>;
}

export interface Video extends VideoInfo {
    getDownloadLinks(): Promise<DownloadLinks>;
}

export interface Podcast extends PodcastInfo {
    getDownloadLinks(): Promise<DownloadLinks>;
}

/**
 * Music info along side its downloader function
 *
 * @interface Music
 * @prop {string} id
 * @prop {string} title
 * @prop {string} artist
 * @prop {string} artwork
 * @prop {number} likes
 * @prop {number} plays
 * @prop {Date} date  When the music was added to Radio javan
 * @prop {string} url
 * @prop {string|null} video Music video link if there is any
 * @prop {function} getDownloadLinks
 */

/**
 * Podcast info along side its downloader function
 *
 * @interface Podcast
 * @prop {string} id
 * @prop {string} title
 * @prop {string} artist
 * @prop {string} artwork
 * @prop {number} likes
 * @prop {number} plays
 * @prop {Date} date  When the music was added to Radio javan
 * @prop {string} url
 * @prop {function} getDownloadLinks
 */

/**
 * Video info along side its downloader function
 *
 * @interface Video
 * @prop {string} id
 * @prop {string} title
 * @prop {string} artist
 * @prop {string} thumbnail
 * @prop {number} likes
 * @prop {number} plays
 * @prop {Date} date When the video was added to Radio javan
 * @prop {string} url
 * @prop {string|null} song Song link if there is any
 * @prop {function} getDownloadLinks
 */
