# rjdl
Radio Javan Downloader for NodeJs

## Usage
### 🔹 type(url)
A simple function to get type of a link.  
 example:
```js
var rj = require('./node-rjdl')

const type = rj.type('https://www.radiojavan.com/mp3s/album/Zedbazi-Zakhar-Nameh?index=3');
console.log(type)
```
output: 
```
song
```
valid outputs:
- `song`
- `playList`
- `video`
- `podcast`
- `album`

###  🔹 getDownloadLink(url , quality , mp3only=false)
Getting the download link of a Song , Podcast & Video.   
 example:
```js
var rj = require('./node-rjdl')

const dl = await rj.getDownloadLink('https://www.radiojavan.com/mp3s/album/Zedbazi-Zakhar-Nameh?index=3' , 'low')
console.log(dl)
```
output:
```
https://host1.rj-mw1.com/media/mp3/mp3-256/Zedbazi-Nabayad-Vaysim.mp3
```
the mp3Only can be set true if you dont want the .mp4 at all and only want to get mp3 versions of videos
> ⚠ warning : Be careful using mp3only! some videos doesn't have an MP3 version on radio javan and the returned value would be NULL
```js
var rj = require('./node-rjdl')

const dl = await rj.getDownloadLink('https://www.radiojavan.com/videos/video/sepehr-khalse-fekro-khial' , 'low' , true)
console.log(dl)
```
output:
```
https://host1.rj-mw1.com/media/mp3/mp3-256/sepehr-khalse-fekro-khial.mp3
```
The quality can be set `low` or `high`

### 🔹 getInfo(url)
Getting info from the links of the types blow:
- `song`
- `playList`
- `video`
- `podcast`
- `album`

Song example:
```js
var rj = require('./node-rjdl')

const info = await rj.getInfo('https://www.radiojavan.com/mp3s/mp3/Behzad-Leito-Sepehr-Khalse-Dast-Foroush-(Ft-Siavash-Rad-Anita)');
console.log(info)
```
output:
```
{
  title: 'Dast Foroush (Ft Siavash Rad & Anita)',
  artist: 'Behzad Leito & Sepehr Khalse',
  artwork: 'https://assets.rjassets.com/static/mp3/behzad-leito-sepehr-khalse-dast-foroush-(ft-siavash-rad-anita)/6592dd6d41dc9fe.jpg',
  plays: 5770055,
  likes: 8303,
  date: 'dec 23, 2016'
}
```
other output demos can be found on [/demos/get info demo/](https://github.com/Keivan-sf/rjdl/tree/main/demos/get%20info%20demo)
