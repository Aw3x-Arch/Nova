import { db } from "../Javascript/firebase.js";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { initAuth, signOut, auth } from "../Javascript/auth.js";
import { initTheme } from "../Javascript/theme.js";
initTheme();


let currentFirebaseUser = null; // Để bên ngoài để updatePostCount dùng được

document.addEventListener("DOMContentLoaded", () => {
  const createPostPanel = document.querySelector(".create-post-gui");
  const commentPanel = document.querySelector(".comment-gui");
  const notifyPanel = document.querySelector(".notify-gui");
  const openCreatePostButtons = document.querySelectorAll(".openCreatePosts");
  const addImageBtn = document.querySelector(".add-image");
  const addVideoBtn = document.querySelector(".add-video");
  const imageInput = document.getElementById("imageInput");
  const videoInput = document.getElementById("videoInput");
  const postBtn = document.querySelector(".post-btn");
  const preparePost = document.querySelector(".prepare-post");
  const feeds = document.getElementById("feeds");

  let selectedImage = null;
  let selectedVideo = null;
  //TODO Logout
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut(auth);
    console.log("Đăng xuất thành công")
    window.location.href = "../Html/Login.html";
  });
  //TODO Delete
  document.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (!deleteBtn) return;

    if (!confirm("Xóa post này?")) return;

    try {
      await deleteDoc(doc(db, "posts", deleteBtn.dataset.id));
      deleteBtn.closest(".post").remove();
    } catch (err) {
      console.error("Xóa thất bại:", err.message);
    }
  });
  //TODO Open create post panel
  openCreatePostButtons.forEach((btn) => {
    btn.addEventListener("click", () => createPostPanel.classList.add("show"));
  });

  //TODO Close create post panel
  createPostPanel.addEventListener("click", (e) => {
    if (e.target === createPostPanel) createPostPanel.classList.remove("show");
  });

  //TODO Select video/img
  addImageBtn.addEventListener("click", () => imageInput.click());
  addVideoBtn.addEventListener("click", () => videoInput.click());

  imageInput.addEventListener("change", (e) => {
    if (e.target.files[0]) selectedImage = e.target.files[0];
  });

  videoInput.addEventListener("change", (e) => {
    if (e.target.files[0]) selectedVideo = e.target.files[0];
  });

  //TODO Create POST
  postBtn.addEventListener("click", async () => {
    const contentDiv = document.getElementById("postContent");
    const text = contentDiv.innerHTML.trim();

    if (!text && !selectedImage && !selectedVideo) {
      alert("You haven't written any content or added any media!");
      return;
    }

    const newPost = document.createElement("div");
    newPost.className = "post";

    let mediaHTML = "";
    if (selectedImage) {
      const imgURL = URL.createObjectURL(selectedImage);
      mediaHTML += `<img src="${imgURL}" class="post-media" />`;
    }
    if (selectedVideo) {
      const videoURL = URL.createObjectURL(selectedVideo);
      mediaHTML += `
      <video controls class="post-media">
        <source src="${videoURL}" type="${selectedVideo.type}">
      </video>`;
    }

    const displayUsername = currentFirebaseUser?.displayName || "Anonymous";
    const displayAvatar = currentFirebaseUser?.photoURL || "/Image/avatar.jpeg";

    newPost.innerHTML = `
    <div class="top-post">
      <div class="post-user-info">
        <h4 class="post-username">
          <img src="${displayAvatar}" class="post-avatar" />
          ${displayUsername}
        </h4>
        <p class="post-time">Just now</p>
      </div>
    </div>
    <p class="post-text">${text}</p>
    <div class="post-image">${mediaHTML}</div>
    <div class="post-bottom">
      <div class="action"><i class="fa-solid fa-eye"></i> Views</div>
      <div class="action">
        <button class="like-btn"><i class="fa-solid fa-heart fa-beat"></i> Like</button>
      </div>
      <div class="action">
        <button class="opencomment"><i class="fa-solid fa-comment"></i> Comment</button>
      </div>
      <div class="reaction">
        <button>😯</button><button>😡</button><button>❤️</button>
        <button>😂</button><button>😢</button>
      </div>
    </div>
  `;

    preparePost.insertAdjacentElement("afterend", newPost);
    contentDiv.innerHTML = "";
    selectedImage = null;
    selectedVideo = null;
    createPostPanel.classList.remove("show");

    console.log("Chuẩn bị lưu Firebase...");
    console.log("db:", db);
    try {
      await addDoc(collection(db, "posts"), {
        uid: currentFirebaseUser?.uid,
        username: displayUsername,
        avatar: displayAvatar,
        text: text,
        createdAt: Date.now(),
      });
      console.log("Lưu post thành công!");
    } catch (err) {
      console.error("Lưu post thất bại:", err.message);
    }
  });

  feeds.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    if (likeBtn) likeBtn.classList.toggle("liked");

    const commentBtn = e.target.closest(".opencomment");
    if (commentBtn) commentPanel.classList.add("show");
  });

  commentPanel.addEventListener("click", (e) => {
    if (e.target === commentPanel) commentPanel.classList.remove("show");
  });

  document.querySelectorAll(".openNotify").forEach((btn) => {
    btn.addEventListener("click", () => notifyPanel.classList.add("show"));
  });

  notifyPanel.addEventListener("click", (e) => {
    if (e.target === notifyPanel) notifyPanel.classList.remove("show");
  });

  const suggestionsContainer = document.querySelector(".suggestions");
  if (suggestionsContainer) {
    suggestionsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".follow-btn button");
      if (!btn) return;

      if (btn.classList.contains("followed")) {
        btn.classList.remove("followed");
        btn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Follow`;
      } else {
        btn.classList.add("followed");
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Followed`;
      }
    });
  }
  initAuth((user) => {
    currentFirebaseUser = user;
    loadPosts();
  });
});

async function loadPosts() {
  const preparePost = document.querySelector(".prepare-post");
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const postId = docSnap.id;

      const deleteBtn = data.uid === currentFirebaseUser?.uid
        ? `<button class="delete-btn" data-id="${postId}"><i class="fa-solid fa-trash"></i></button>`
        : "";

      const newPost = document.createElement("div");
      newPost.className = "post dynamic";
      newPost.innerHTML = `
        <div class="top-post">
          <div class="post-user-info">
            <h4 class="post-username">
              <img src="${data.avatar}" class="post-avatar" />
              ${data.username}
            </h4>
            <p class="post-time">Just now</p>
          </div>
          ${deleteBtn}
        </div>
        <p class="post-text">${data.text}</p>
        <div class="post-bottom">
          <div class="action"><i class="fa-solid fa-eye"></i> Views</div>
          <div class="action">
            <button class="like-btn"><i class="fa-solid fa-heart fa-beat"></i> Like</button>
          </div>
          <div class="action">
            <button class="opencomment"><i class="fa-solid fa-comment"></i> Comment</button>
          </div>
          <div class="reaction">
            <button>😯</button><button>😡</button><button>❤️</button>
            <button>😂</button><button>😢</button>
          </div>
        </div>
      `;
      preparePost.insertAdjacentElement("afterend", newPost);
    });
    console.log("Load posts thành công!");
  } catch (err) {
    console.error("Load posts thất bại:", err.message);
  }
}