export const radioJavanLinkRegex =
    /^(https:\/\/|http:\/\/)?(www\.)?(radiojavan\.com)\/.*/g;
export const typeRegex = {
    Music: /radiojavan\.com\/mp3s\/mp3\/[^\/]+/g,
    Video: /radiojavan\.com\/videos\/video\/[^\/]+/g,
    Album: /radiojavan\.com\/mp3s\/album\/[^\/]+/g,
    Podcast: /radiojavan\.com\/podcasts\/podcast\/[^\/]+/g,
    Playlist: /radiojavan\.com\/playlists\/playlist\/mp3\/[^\/]+/g,
    TV: /radiojavan\.com\/tv$/g,
};
