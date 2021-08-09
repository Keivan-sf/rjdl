const axios = require('axios')
const cheerio = require('cheerio');
var links  = require('./dl-generator')

async function getInfoFromLink(url , type='mp3' , fix = true){

  // Getting the SourceCode of the url , and if it is a video , tries to get source code of its song url if possible (to get more data) :

  const source = type!='video' ? await sourceCode(url) : await sourceCode(url.split('/videos/video/').join('/mp3s/mp3/'));
  var videoSource;

  // Checking if the url was invalid and it lead us to the RadioJavan main page :

  if((!source || source.includes('id="mp3s"')) && type != 'video'){
    console.log(`rjdl : src > getDataUrl.js >> getInfoFromLink() : error getting information from the link : '${url}'`)
    return null;
  }

  // Checking if the link was for a video and also it had a song in Radio Javan :

  if((source && !source.includes('id="mp3s"')) && type=='video') type = 'mp3';

  // Checking if the link was for a video and it DIDN'T HAVE a song in Radio Javan
  // So it tries to get the SourceCode from original video link (low speed) :

  if((!source || source.includes('id="mp3s"')) && type=='video'){
    const src = await sourceCode(url);
    videoSource = src;
  }

  // Trying to get info from the sourcecode based on the url type :

  var resultInfo;
  switch(type){
     case 'mp3' :
      resultInfo = seperator(source , false);
        break;
     case 'playlist' :
      resultInfo = playlistInfo(source);
        break;
     case 'album' :
      resultInfo = albumInfo(source);
        break;
     case 'podcast' : 
     resultInfo = podcastInfo(source);
        break;
     case 'video' : 
     resultInfo = videoInfo(videoSource);
        break;
  }

  // Converting some HTML character codes in our response to normal characters :
  if(fix && resultInfo) resultInfo = replaceJson(resultInfo , '&amp;' , '&');
  return resultInfo;
}

function sourceCode(url){

  // Simple function for getting the source code from a url

    return new Promise(function(resolve, reject){
        axios
        .get(url)
        .then(async res => {       
          resolve(res.data)
        })
        .catch(error => {
          reject(flase)
          console.log('This video dosent have any mp3 version')
        })
    })

}

 async function download(data , quality , url){
    var namePost = url.name;
    var urlType = url.type;

    // Checking if the url is from a playlist song 
    // Because playlist songs' url are completely defferent & the data program needs cannot be found only on url
    // And in that case , for making a download link , we need to get its data with a request to the song page

    if(url.playList){
      const dataUrl = await getInfoFromLink(data , 'mp3' , false);
      namePost = spaceToDash(dataUrl.artist + ' ' + dataUrl.title);
      urlType = "mp3";
    }

    // Sending a POST request to Radio Javan to get the host domain of the current song : 

      var host;
      var getHostUrl = `https://www.radiojavan.com/${urlType === 'mp3' ? 'mp3s/mp3_host/' : urlType === 'video' ? 'videos/video_host' : 'podcasts/podcast_host'}`
      return new Promise(function (resolve,reject){
       axios
      .post(getHostUrl, {
        id: namePost
      })
      .then(async res => {
        host = res.data.host;

        // Creating the link with the host domain recieved : 

        var finalVal = links.createLink(host, namePost , urlType , quality) + '\n';

        // Checking if the link is valid or not : 

        if(finalVal.startsWith('undefined')) console.log("rjdl : src > getDataUrl.js >> download() : Coudln't create the link \n The wrong link : " + finalVal)

        // resolving the link whether it is correct or not. ( The validation of the link will be ckecked on index.js >> getDownloadLink() )

        resolve(finalVal)
      })
      .catch(error => {
        console.log('err getting host url')
        reject(error)
      })
      })
    
  }

function seperator(codeData , du=true){

    // Getting song data
    // Extracting data we want from the SourceCode using cheerio (jquery simulator for node.js)
    // "du" variable is for a possible update I might add , for now ignore it ! It has been set "FALSE" wherever this function is called

    const $ = cheerio.load(codeData);
    var counter = 0;
    var artist = $('.artist').html()
    var song = $('.song').html()
    var artworkHtml = $('.artwork').html()
    var strplays = $('.views').html().split('Plays: ')[1]
    var plays = strplays.includes(',') ? parseInt(strplays.split(',').join('')) : parseInt(strplays);
    var strlikes = $('.rating').html().split(' likes')[0];
    var likes = strlikes.includes(',') ? parseInt(strlikes.split(',').join('')) : parseInt(strlikes)
    var date = $('[pubdate="pubdate"]').html().toLowerCase().split('date added: ')[1]
    var artwork = artworkHtml.split('src="')[1].split('"')[0];
    var mp3Description = $('.mp3Description').html();
    var unknownArgs;
    var result = {};

    // For now "du" is always FALSE

    if(du){
        var timestamp = $('#mp3_duration').html()
        result = {
            'title' : song,
            'artist' : artist,
            'artwork' : artwork,
            'timestamp' : timestamp,
            'plays' : plays,
            'likes' : likes,
            'date' : date
        }
    }else{
        result = {
            'title' : song,
            'artist' : artist,
            'artwork' : artwork,
            'plays' : plays,
            'likes' : likes,
            'date' : date
        }
    }

    return result;
}

function videoInfo(codeData){

  // Getting Video data
  // Extracting data we want from the SourceCode using cheerio (jquery simulator for node.js)

  const $ = cheerio.load(codeData);
  var artist = $('.artist').html();
  var title = $('.song').html();
  var likesStr = $('.rating').html().split(' likes')[0];
  var likes = likesStr.includes(',') ? parseInt(likesStr.split(',').join('')) : parseInt(likesStr);
  var strplays = $('.views').html().split('Plays: ')[1]
  var plays = strplays.includes(',') ? parseInt(strplays.split(',').join('')) : parseInt(strplays);
  var date = $('[pubdate="pubdate"]').html().toLowerCase().split('date added: ')[1]
  var result = {
    'title' : title,
    'artist' : artist,
    'likes' : likes,
    'plays' : plays,
    'date' : date

  }
  return result;
}

function playlistInfo(codeData){
  
  // Getting Playlist data
  // Extracting data we want from the SourceCode using cheerio (jquery simulator for node.js)

  const $ = cheerio.load(codeData);
  var artworkContainer = $('.artworkContainer').html();
  var playListCover = artworkContainer ? artworkContainer.split('src="')[1].split('"')[0] : null;
  var playlistCode = $(".songInfo").html();
  var title = playlistCode.split("<h2 class=\"title\">")[1].split('</h2>')[0];
  var creator = playlistCode.split('<span class="label radius secondary">')[1].split('</span>')[0];
  var songsSplit = playlistCode.split(' songs</span> | <span id="follower_count">')[0].split('<span>');
  var songsCount = parseInt(songsSplit[songsSplit.length - 1]);
  var followersStr = $('#follower_count').html().split(' followers')[0];
  var followers = followersStr.includes(',') ? parseInt(followersStr.split(',').join('')) : parseInt(followersStr);
  var tracks = [];
  for(var i=1; i<=songsCount; i++){
    var song = $(`li:nth-child(${i})`).html();
    var songLink = 'https://www.radiojavan.com' + song.split('<a href="')[1].split('">')[0];
    var songName = song.split('<span class="song" title="')[1].split('"')[0];
    var artistName = song.split('<span class="artist" title="')[1].split('"')[0];
    var songArt = song.split('" src="')[1].split('"')[0];
    tracks[i-1] = {
      'title' : songName,
      'artist' : artistName,
      'link' : songLink,
      'artwork' : songArt
    }
  }
  var res = {
    'title' : title,
    'creator': creator,
    'songs' : songsCount,
    'followers' : followers,
    'image' : playListCover,
    'tracks' : tracks

  }
  return res;
}

function albumInfo(codeData){

  // Getting Album data
  // Extracting data we want from the SourceCode using cheerio (jquery simulator for node.js)

  var cd = codeData.split('<div id="breadcrumbs_container" class="">')[0] + '<div class="webPlayer">' +codeData.split('<div class="webPlayer">')[1];
  const $ = cheerio.load(cd);
  var playlistCode = $(".songInfo").html();
  var artworkContainer = $('.artworkContainer').html();
  var albumArtWork = artworkContainer ? artworkContainer.split('src="')[1].split('"')[0] : null;
  var title = playlistCode.split('<span class="album">')[1].split('</span>')[0];
  var artist = playlistCode.split('<span class="artist">')[1].split('</span>')[0];
  var songsCount = codeData.split('album_track').length - 1;
  var tracks = [];
  for(var i=1; i<=songsCount; i++){
    var song = $(`li:nth-child(${i})`).html();
    if(song == null) break;
    var songLink = 'https://www.radiojavan.com' + song.split('<a href="')[1].split('">')[0];
    var songName = song.split('<span class="song" title="')[1].split('"')[0];
    var artistName = song.split('<span class="artist" title="')[1].split('"')[0];
    var songArt = song.split('" src="')[1].split('"')[0];
    tracks[i-1] = {
      'title' : songName,
      'artist' : artistName,
      'link' : songLink,
      'artwork' : songArt
    }
  }
  var res = {
    'title' : title,
    'artist': artist,
    'songs' : songsCount,
    'image' : albumArtWork,
    'tracks' : tracks
  }
  return res;
}

function podcastInfo(codeData){

  // Getting Podcast data
  // Extracting data we want from the SourceCode using cheerio (jquery simulator for node.js)

  const $ = cheerio.load(codeData);
  var artworkContainer = $('.artworkContainer').html();
  var podcastArt = artworkContainer.includes('src="') ? artworkContainer.split('src="')[1].split('"')[0] : null;
  var title = artworkContainer.split('class="artist">')[1].split('</span>')[0];
  var artist = artworkContainer.split('class="song">')[1].split('</span>')[0];
  var likesStr = $('#podcast_likes').html().split('class="rating">')[1].split(' likes')[0];
  var likes = likesStr.includes(',') ? parseInt(likesStr.split(',').join('')) : parseInt(likesStr);
  var strplays = $('.views').html().split('Plays: ')[1]
  var plays = strplays.includes(',') ? parseInt(strplays.split(',').join('')) : parseInt(strplays);
  var date = $('[pubdate="pubdate"]').html().toLowerCase().split('date added: ')[1]
  var result = {
    'title' : title,
    'creator' : artist,
    'image' : podcastArt,
    'likes' : likes,
    'plays' : plays,
    'date' : date
  }
  return result;
}

function spaceToDash(data){

  // Simple function to convert names suitable for url

  if(!data || data == null) return '';
  if (data.includes('&amp;')){
    if(data.includes(' &amp;')) data = data.split(' &amp;').join('');
    if(data.includes('&amp; ')) data = data.split('&amp; ').join('');
  }
  if(data.includes(',')) data = data.split(',').join('');
  if(data.includes('  ')) data = data.split('  ').join(' ');
  var dataSplit = data.split(' ');
  var dataDash = dataSplit[0];
  for(var i=1; i<dataSplit.length ; i++){
    dataDash += ("-" + dataSplit[i])
  }
  return dataDash;
}

function replaceJson(data , value , replace){

  // Simple function to replace a txt in JSON
  
  let strJson = JSON.stringify(data);
  let str = strJson.includes(value) ? strJson.split(value).join(replace) : strJson;
  let res = JSON.parse(str)
  return res;
}

module.exports = {
    getInfoFromLink , download , sourceCode
}