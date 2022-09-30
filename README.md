![node rjdl](https://raw.githubusercontent.com/Keivan-sf/rjdl/gh-pages/images/page.jpg)

# Node rjdl

Radio javan scraper / downloader

**Docs [keivan-sf.github.io/rjdl](https://keivan-sf.github.io/rjdl)**

## Install

```bash
npm i node-rjdl
```

## Usage

Here's a quick guide to start

```ts
import * as Rj from "node-rjdl";

const song = await Rj.getMusic("https://rj.app/m/2qKkkB8q");
// {title: ... , artist: ... , ...}

const downloadLinks = await song.getDownloadLinks();
// {midQuality: ... , highQuality: ...}
```

### Getting link type

Supported for `Playlists` , `Albums` , `Podcasts` , `Videos` , `Musics` , `TV`

```ts
const rjType = Rj.getLinkType(
    "https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"
);
console.log(rjType === Rj.LinkType.Music); // true
```

### Getting input info

Supported for `Playlists` , `Albums` , `Podcasts` , `Musics` , `Videos`

```ts
const songInfo = await Rj.getMusic(
    "https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"
);
// {title: "Bye Bye Bye" , artist: "Donya" , getDownloadLinks() , ...}
```

### Getting download links

Download links will be provided in **mid** and **high** qualities. It's common to use these functions when you only need the download links alone. Otherwise, `getMusic` and other info getters suite you best with both info and download links in an optimized way.

Supported for `Musics` , `Podcasts` , `Videos`

```ts
const links = await Rj.getMusicDownloadLinksViaURL(
    "https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"
);

console.log(links.midQuality);
// https://host2.rj-mw1.com/media/mp3/mp3-256/Donya-Bye-Bye-Bye.mp3

console.log(links.highQuality);
// https://host2.rj-mw1.com/media/mp3/mp3-320/Donya-Bye-Bye-Bye.mp3
```

### Validating URL

Only the URLs which their link type is recognizable will be considered valid

```ts
Rj.validateURL("https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"); // true

Rj.validateURL("https://rj.app/ma/D18eAKwY"); // true

Rj.validateURL("https://google.com"); // false

Rj.validateURL("https://radiojavan.com"); // false
```

## Scripts

### Building

To get started install the packages

```bash
npm install
```

Then you'll be able to use the build script

```
npm run build
```

### Testing

For all tests

```
npm test
```

For unit and integration tests only

```bash
npm run unitTest
```

For end to end tests only (ending with `.test.e2e.ts`)

```
npm run e2eTest
```
