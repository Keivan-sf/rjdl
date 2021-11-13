/*
  Created with love by Keivan.sf
  E-mail : keyvan0082@gmail.com
*/
var info  = require('./src/getDataUrl.js')
const axios = require('axios')
const cheerio = require('cheerio');
const { replaceWith } = require('cheerio/lib/api/manipulation');
let validKeys = [
  'radiojavan.com/mp3s/mp3/',
  'radiojavan.com/playlists/playlist/mp3/',
  'radiojavan.com/videos/video/',
  'radiojavan.com/podcasts/podcast/',
  'radiojavan.com/mp3s/playlist_start?id=',
  'radiojavan.com/mp3s/album/'
]
let validTypes = [
  'song',
  'playList',
  'video',
  'podcast',
  'song',
  'album'
]

/**
 * 
 * @param {String} data Target Link
 * @param {String} quality "low" or "high"
 * @param {Boolean} mp3only Be carefull using mp3Only, Some videos dont provide an MP3 version!
 * @returns Download link
 */

async function getDownloadLink(data , quality , mp3only = false){
  
  // Be careful using mp3only!
  // Some videos cannot be converted to mp3
  // To indentify the false links, They will be started with 'undefined' and in this case the function will return NULL

  var urlwoq = data;

  // Checking if the link is from the related songs of another track ( It is necessary to get the original clean url ) :

  if(!data.includes('playlist_start') && data.includes('?') && !data.includes('?index=')){
    urlwoq = data.split('?')[0];
  }

  // Checking if the user wants mp3 only and their input is video or not :

  var urlDataType = urlData(urlwoq);
  if(mp3only && urlDataType.type == 'video'){
    urlDataType = {
      'name' : urlDataType.name,
      'type' : 'mp3',
      'playList' : false
    }
  }

  // trying to create a Download link from the input url :

  const res = await info.download(urlwoq , quality , urlDataType);
  var output = res;

  // Checking if the link is valid:
  let linkToCheck = res.low ? res.low : res;
  if(linkToCheck.startsWith('undefined')) throw new Error("The link couldn't be created")
  return output;
}


/**
 * 
 * @param {String} data Target Link
 * @returns Link info on radio javan
 */

async function getInfo(data){

// Confirming if the url type is supported based on the values on "validKeys"

 var Gotkeys =  hasKey(data);
 if(!Gotkeys){
   throw new Error('The url is invalid');
 }
 var url = urlData(data);

// Checking if the url is from a playlist song (because playlist songs' url are completely defferent & the data program needs cannot be found only on url)

 var urlType = url.playList ? 'mp3' : url.type;
 const linkInfo = await info.getInfoFromLink(data , urlType)
 return linkInfo;
}

async function validURL(data){

  // Advanced and the slow checking for validating url (not recommended to be used)
  // this one includes the basic validation of "validKeys" as well and also requests to the link to see if the page is completely valid

  if(hasKey(data)){
    return new Promise(function(resolve, reject){
      axios
      .get(data)
      .then(async res => {    
        const $ = cheerio.load(res.data);
        if(res.data.includes("<div id=\"sign\" class=\"\">")){
          var err = $('#sign').html()
          if(err.includes('404')){
            resolve(null)
          }else{
            resolve(res.data)
          }
        }else{
           resolve(res.data)
        }
      })
      .catch(error => {
        reject(null)
      })
  })
  }else{
    return null;
  }

}

function hasKey(data, type = false , videoLink = true){

  // A function for basic validation of the url based on the "validKeys"

  if(data.includes('radiojavan.com/')){
    var foundKey = false , videoKey = false;
    var split = data.split('radiojavan.com/')[1];
    var url = 'https://www.radiojavan.com/' + split;
    var theType;
    for(var i=0; i< validKeys.length; i++){
      if(url.includes(validKeys[i])){
        foundKey = true;
        theType = validTypes[i];
        if(validKeys[i] == 'radiojavan.com/videos/video/') videoKey = true;
        break;
      }
    }
    if(foundKey){
      if(videoKey && !videoLink){
        var result = url.split('/videos/video/').join('/mp3s/mp3/');
        var res = type ? {'url' : result , 'type' : theType} : result;
        return res;
      }else{
        var result = type ? {'url' : url , 'type' : theType} : url;
        return result;
      }
    }else{
      return false;
    }
  }else{
    return false;
  }
}

/**
 * 
 * @param {String} data Target Link
 * @returns {String} link type on radio javan
 */

function type(data){

  // Simple function for getting the type of the url (all the valid types are stored at "validTypes" values)

  var currentURL = hasKey(data , true);
  var result = null;
    if(currentURL){
      result = currentURL.type;
      if(currentURL.type == 'album'){
        result = data.includes('?index=') ? 'song' : 'album';
      }
    }
   return result;
}



function urlData(url){

  // Getting as much as info that can be found in the url itself
  // If the url is from a playlist song , "result.playlist" will be : TRUE
  // Otherwise "result.playlist" will be : FALSE 
  // this is because playlist songs' url are completely defferent & the data program needs cannot be found only on url

  if(!url.includes('playlist_start') && !url.includes('?index='))
  {
      var urlSp = url.split('radiojavan.com/');
      urlSp = urlSp[1].split('/');
      var type = urlSp[1];
      var name = urlSp[2];
      var result = {
        'type' : type ,
        'name' : name , 
        'playList' : false
      }
      return result;
  }else{
    result ={
      'type' : null ,
      'name' : null , 
      'playList' : true
    }
    return result;
  }
}
  
  module.exports = { getDownloadLink , getInfo  , validURL , type};
