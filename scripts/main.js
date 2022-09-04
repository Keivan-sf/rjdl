const installBox = document.querySelector(".install-box");
installBox.onclick = () => {
    const clipBoardText = installBox.textContent;
    navigator.clipboard.writeText(clipBoardText).catch();
};
