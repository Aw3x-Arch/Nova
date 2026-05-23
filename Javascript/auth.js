// auth.js - dùng chung cho tất cả trang
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export { auth, signOut };

export function initAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const usernameText = document.querySelector(".info-user h4");
            if (usernameText) usernameText.textContent = user.displayName || user.email || "User";

            const postUsernameEl = document.querySelector(".create-post-user .post-username");
            if (postUsernameEl) postUsernameEl.textContent = user.displayName || user.email || "User";

            if (callback) callback(user);
        } else {
            window.location.href = "/Html/Login.html";
        }
    });
}