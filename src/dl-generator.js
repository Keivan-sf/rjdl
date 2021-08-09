function createLink(host , name , type , quality = 'both'){
 var urlLow = `${host}/media/${type === 'video' ? 'music_video' : type}/${type=== 'video' ? 'lq' :  'mp3-256'}/${name}.${type === 'video' ? 'mp4' : 'mp3'}`
 var urlHigh = `${host}/media/${type === 'video' ? 'music_video' : type}/${type=== 'video' ? 'hq' :  'mp3-320'}/${name}.${type === 'video' ? 'mp4' : 'mp3'}`
 var links = quality === 'high' ? urlHigh : quality === 'low' ? urlLow : {low: urlLow , high:urlHigh};
 return links;
}

module.exports= {
    createLink
}