# Node rjdl

Radio javan scraper / downloader

## Usage

Here's a quick guide to start

### Getting link type

-   Supported for `Playlists` , `Albums` , `Podcasts` , `Videos` , `Musics` , `TV`

```ts
import * as Rj from "node-rjdl";

const rjType = Rj.getLinkType(
    "https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"
);
console.log(rjType === Rj.LinkType.Music); // true
```

### Getting input info

-   Supported for `Playlists` , `Albums` , `Podcasts` , `Musics` , `Videos`

```ts
import * as Rj from "node-rjdl";
const songInfo = await Rj.getMusicInfo(
    "https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"
);
```

### Getting download links

Download links will be provided in mid and high qualities.

-   Supported for `Musics` , `Podcasts` , `Videos`

```ts
import * as Rj from "node-rjdl";

const links = await Rj.getMusicDownloadLinksViaURL(
    "https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"
);

console.log(links.midQuality); // https://host2.rj-mw1.com/media/mp3/mp3-256/Donya-Bye-Bye-Bye.mp3

console.log(links.highQuality); // https://host2.rj-mw1.com/media/mp3/mp3-320/Donya-Bye-Bye-Bye.mp3
```

### Validating URL

Only the URLs which their link type is recognizable will be considered valid

```ts
import * as Rj from "node-rjdl";

Rj.validateURL("https://radiojavan.com/mp3s/mp3/Donya-Bye-Bye-Bye"); // true

Rj.validateURL("https://google.com"); // false

Rj.validateURL("https://radiojavan.com"); // false
```
