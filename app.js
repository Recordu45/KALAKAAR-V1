/* ==========================================
   KALAKAAR V1
   Music + Reels App
========================================== */

const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");

const miniPlayer = document.getElementById("miniPlayer");
const trackName = document.getElementById("trackName");

let toastTimer;


/* ==========================================
   NAVIGATION
========================================== */

function navigate(id, button) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(id);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================================
   CREATE REEL
========================================== */

function openCreate() {

    const createButton =
        document.querySelector('[data-screen="createScreen"]');

    navigate("createScreen", createButton);
}


/* ==========================================
   TOAST MESSAGE
========================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);
}


/* ==========================================
   MUSIC PLAYER
========================================== */

function playTrack(element, name) {

    if (!trackName || !miniPlayer) return;

    trackName.textContent = name;

    miniPlayer.classList.add("show");

    showToast(`Playing: ${name}`);
}


function togglePlayer() {

    showToast(
        "Real audio player V2 me connect hoga"
    );
}


/* ==========================================
   LIKE REEL
========================================== */

function like(button) {

    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {

        button.firstChild.textContent = "♥";

        showToast("Reel liked");

    } else {

        button.firstChild.textContent = "♡";

        showToast("Like removed");
    }
}


/* ==========================================
   SAVE REEL
========================================== */

function save(button) {

    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {

        showToast("Reel saved");

    } else {

        showToast("Removed from saved");
    }
}


/* ==========================================
   OPEN REELS
========================================== */

function playReel(card) {

    const reelsButton =
        document.querySelector(
            '[data-screen="reelsScreen"]'
        );

    navigate(
        "reelsScreen",
        reelsButton
    );
}


/* ==========================================
   VIDEO SELECT
========================================== */

function handleVideo(input) {

    const file =
        input.files?.[0];

    const target =
        document.getElementById(
            "selectedFile"
        );

    if (!file) return;

    if (target) {

        target.innerHTML = `
            <p style="
                color:#fff;
                font-size:12px;
                margin-top:18px;
            ">
                Selected: ${file.name}
            </p>
        `;
    }

    showToast("Video selected");
}


/* ==========================================
   SHARE
========================================== */

function shareReel() {

    if (navigator.share) {

        navigator.share({
            title: "Kalakaar",
            text: "Check out this reel on Kalakaar!"
        }).catch(() => {});

    } else {

        showToast("Share option opened");
    }
}


/* ==========================================
   COMMENTS
========================================== */

function openComments() {

    showToast(
        "Comments feature V2 me aayega"
    );
}


/* ==========================================
   FOLLOW
========================================== */

function followUser(button) {

    if (!button) return;

    button.classList.toggle("following");

    if (button.classList.contains("following")) {

        button.textContent = "Following";

        showToast("Following user");

    } else {

        button.textContent = "Follow";

        showToast("Unfollowed");
    }
}


/* ==========================================
   SEARCH
========================================== */

function searchMusic(value) {

    const query =
        value.trim().toLowerCase();

    if (!query) return;

    showToast(
        `Searching for "${value}"`
    );
}


/* ==========================================
   CHIP FILTER
========================================== */

document.querySelectorAll(".chip")
.forEach(chip => {

    chip.addEventListener("click", () => {

        document
            .querySelectorAll(".chip")
            .forEach(item => {
                item.classList.remove("active");
            });

        chip.classList.add("active");

        showToast(
            `${chip.textContent} selected`
        );
    });

});


/* ==========================================
   FILE VALIDATION
========================================== */

function validateVideo(file) {

    if (!file) return false;

    if (!file.type.startsWith("video/")) {

        showToast(
            "Please select a video file"
        );

        return false;
    }

    const maxSize =
        100 * 1024 * 1024;

    if (file.size > maxSize) {

        showToast(
            "Video must be below 100MB"
        );

        return false;
    }

    return true;
}


/* ==========================================
   VIDEO PREVIEW
========================================== */

function previewVideo(input) {

    const file =
        input.files?.[0];

    if (!validateVideo(file)) return;

    const preview =
        document.getElementById(
            "videoPreview"
        );

    if (!preview) return;

    const videoURL =
        URL.createObjectURL(file);

    preview.src = videoURL;

    preview.style.display = "block";

    preview.play().catch(() => {});

    showToast("Video preview ready");
}


/* ==========================================
   PROFILE
========================================== */

function editProfile() {

    showToast(
        "Profile editor V2 me aayega"
    );
}


/* ==========================================
   NOTIFICATION
========================================== */

function openNotifications() {

    showToast(
        "No new notifications"
    );
}


/* ==========================================
   PAGE INITIALIZATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const home =
            document.getElementById(
                "homeScreen"
            );

        if (home) {
            home.classList.add("active");
        }

        console.log(
            "Kalakaar V1 initialized"
        );

    }
);


/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            showToast(
                "Kalakaar"
            );
        }

    }
);
