export const nameExtractorRegexes = {
    musicName: /(?<=\/song\/)[^\/\?]+/g,
    videoName: /(?<=\/video\/)[^\/\?]+/g,
    albumName: /(?<=\/album\/)[^\/\?]+/g,
    playlistName: /(?<=\/playlist\/mp3\/)[^\/\?]+/g,
    playlistNameFromTrack: /(?<=\/mp3s\/playlist_start\?id\=)[^\/\&]+/g,
    podcastName: /(?<=\/podcast\/)[^\/\?]+/g,
};
