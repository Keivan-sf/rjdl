export const nameExtractorRegexes = {
    musicName: /(?<=\/mp3s\/mp3\/)[^\/\?]+/g,
    videoName: /(?<=\/videos\/video\/)[^\/\?]+/g,
    albumName: /(?<=\/mp3s\/album\/)[^\/\?]+/g,
    playlistName: /(?<=\/playlists\/playlist\/mp3\/)[^\/\?]+/g,
    playlistNameFromTrack: /(?<=\/mp3s\/playlist_start\?id\=)[^\/\&]+/g,
    podcastName: /(?<=\/podcasts\/podcast\/)[^\/\?]+/g,
};
