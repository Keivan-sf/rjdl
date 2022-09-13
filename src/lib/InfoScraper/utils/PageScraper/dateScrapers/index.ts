export const getVideoDate = (document: Document | Element): Date =>
    new Date(
        document
            .querySelector(".date_added")!
            .innerHTML.split("Date added: ")[1]
    );

export const getMusicDate = (document: Document | Element): Date =>
    new Date(
        document.querySelector(".dateAdded")!.innerHTML.split("Date Added: ")[1]
    );

export const getPodcastDate = (document: Document | Element): Date =>
    new Date(
        document.querySelector(".dateAdded")!.innerHTML.split("Date added: ")[1]
    );
