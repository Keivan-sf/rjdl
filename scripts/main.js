const installBox = document.querySelector(".install-box");
const installAnimation = document.querySelector(".install-box-animation");
installBox.onclick = () => {
    const clipBoardText = installBox.textContent.trim();
    navigator.clipboard.writeText(clipBoardText).catch();
    animateCopyAction();
};

const animateCopyAction = () => {
    if (installAnimation.classList.contains("animation-stats")) return;
    installAnimation.classList.add("animation-stats");
    setTimeout(() => installAnimation.classList.remove("animation-stats"), 500);
};
