export const getMusicInfoFromDOM = (document: Document) => {
    const songInfoDiv = document.querySelector(".songInfo");
    const name = songInfoDiv?.querySelector(".song")?.innerHTML;
    const artist = songInfoDiv?.querySelector(".artist")?.innerHTML;
    const likes = +document
        .querySelector(".rating")!
        .innerHTML.split(" likes")[0]
        .replace(/,/g, "");
    const plays = +document
        .querySelector(".views")!
        .innerHTML.split("Plays: ")[1]
        .replace(/,/g, "");

    const date = new Date(
        document.querySelector(".dateAdded")!.innerHTML.split("Date Added: ")[1]
    );
    return {
        name,
        artist,
        likes,
        plays,
        date,
    };
};
