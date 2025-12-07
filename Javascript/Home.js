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
  const toggle = document.getElementById("toggleTheme");
  const logoImg = document.getElementById("logoImg");
  const preparePost = document.querySelector(".prepare-post");
  const feeds = document.getElementById("feeds");

  let selectedImage = null;
  let selectedVideo = null;

  //TODO Theme toggle
  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.replace("dark", "light");
      logoImg.src = "/Image/LogoDark.svg";
      toggle.innerHTML = `<img id="themeIcon" src="/Image/darkIcon.svg" width="25"> Dark`;
    } else {
      document.body.classList.replace("light", "dark");
      logoImg.src = "/Image/LogoLight.svg";
      toggle.innerHTML = `<img id="themeIcon" src="/Image/lightIcon.svg" width="25"> Light`;
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
  postBtn.addEventListener("click", () => {
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

    newPost.innerHTML = `
      <div class="top-post">
        <div class="post-user-info">
          <h4 class="post-username">
            <img src="/Image/avatar.jpeg" class="post-avatar" />
            Alex
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

    //TODO Insert new post
    preparePost.insertAdjacentElement("afterend", newPost);

    //TODO Reset
    contentDiv.innerHTML = "";
    selectedImage = null;
    selectedVideo = null;
    createPostPanel.classList.remove("show");
    updatePostCount();

  });

  feeds.addEventListener("click", (e) => {
    //TODO Like
    const likeBtn = e.target.closest(".like-btn");
    if (likeBtn) likeBtn.classList.toggle("liked");

    //TODO Comment
    const commentBtn = e.target.closest(".opencomment");
    if (commentBtn) commentPanel.classList.add("show");
  });

  //TODO Close comment panel
  commentPanel.addEventListener("click", (e) => {
    if (e.target === commentPanel) commentPanel.classList.remove("show");
  });

  //TODO Open notify
  document.querySelectorAll(".openNotify").forEach((btn) => {
    btn.addEventListener("click", () => notifyPanel.classList.add("show"));
  });

  //TODO Close notify
  notifyPanel.addEventListener("click", (e) => {
    if (e.target === notifyPanel) notifyPanel.classList.remove("show");
  });

  //TODO Follow toogle
  const suggestionsContainer = document.querySelector(".suggestions");

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

  //TODO Current user
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    document.querySelector(".info-user h4").textContent = user.username;
  }
});


// TODO: Update post count
function updatePostCount() {
  let count = Number(localStorage.getItem("userPostCount") || 0);
  count++;

  //TODO Save
  localStorage.setItem("userPostCount", count);

  const postCountText = document.querySelector(".your-post-count");
  if (postCountText) {
    postCountText.innerHTML = `
      <i class="fa-solid fa-paper-plane"></i> Your post: ${count} post
    `;
  }
}

//TODO Count post
document.addEventListener("DOMContentLoaded", () => {
  let count = Number(localStorage.getItem("userPostCount") || 0);
  const postCountText = document.querySelector(".your-post-count");

  if (postCountText) {
    postCountText.innerHTML = `
      <i class="fa-solid fa-paper-plane"></i> Your post: ${count} post
    `;
  }
});
