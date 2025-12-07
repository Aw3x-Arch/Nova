//TODO Count friends
let friendCount = document.querySelectorAll(".friends").length;
const countDisplay = document.getElementById("friendCount");
countDisplay.textContent = friendCount;

//TODO Add Friend
document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".Add");
  if (!addBtn) return;

  //? Take the suggest name
  const box = addBtn.closest(".suggest-add");
  const name = box.querySelector("h3").textContent.trim();

  //? Create box
  const friendList = document.querySelector(".your-friends");
  const newFriend = document.createElement("div");
  newFriend.classList.add("friends");
  newFriend.innerHTML = `
    <h4><img src="/Image/avatar.jpeg" alt=""> ${name}</h4>
    <button class="remove"><i class="fa-solid fa-trash"></i> Unfriend</button>
  `;
  friendList.appendChild(newFriend);

  //? Add
  friendCount++;
  countDisplay.textContent = friendCount;

  //? Remove Box
  document.querySelectorAll(".Add").forEach((button) => {
    button.addEventListener("click", () => {
      const userBox = button.closest(".suggest-user");
      userBox.remove();
    });
  });
});

//TODO Remove Friend
document.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove");
  if (!removeBtn) return;

  //?  Delete
  removeBtn.parentElement.remove();
  friendCount--;
  countDisplay.textContent = friendCount;
});

//TODO Open notify
const notifyPanel = document.querySelector(".notify-gui");
const openNotify = document.querySelectorAll(".openNotify");

openNotify.forEach((btn) => {
  btn.addEventListener("click", () => {
    notifyPanel.classList.add("show");
  });
});

//TODO Click outside to close
notifyPanel.addEventListener("click", (e) => {
  if (e.target === notifyPanel) {
    notifyPanel.classList.remove("show");
  }
});
const toggle = document.getElementById("toggleTheme");
const logoImg = document.getElementById("logoImg");
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
//TODO Current user
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    document.querySelector(".info-user h4").textContent = user.username;
  }
});
//TODO Count post
document.addEventListener("DOMContentLoaded", () => {
  const count = Number(localStorage.getItem("userPostCount") || 0);

  const postCountText = document.querySelector(".your-post-count");
  if (postCountText) {
    postCountText.innerHTML = `
      <i class="fa-solid fa-paper-plane"></i> Your post: ${count} post
    `;
  }
});
