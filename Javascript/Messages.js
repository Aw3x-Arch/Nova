//TODO Count friends
let friendCount = document.querySelectorAll(".friend-name").length;
const countDisplay = document.getElementById("friendCount");
countDisplay.textContent = friendCount;

const friends = document.querySelectorAll(".friend-name");
const chatName = document.querySelector(".opposite-name p");
const chatProfileName = document.querySelector(".opposite-info .name");
const chatProfileImg = document.querySelector(".opposite-info img");
const chatTopImg = document.querySelector(".opposite-name img");

friends.forEach((friend) => {
  friend.addEventListener("click", () => {
    const name = friend.dataset.name;
    const img = friend.dataset.img;

    chatName.innerHTML = `<img src="${img}"> ${name}`;
    //TODO Update name and avatar
    chatProfileName.textContent = name;
    chatProfileImg.src = img;
    chatTopImg.src = img;
  });
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
//TODO Send message
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.querySelector(".chat");

sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (text === "") return; //TODO Don't send empty message

  //TODO Create new message
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", "user");
  newMessage.innerHTML = `<p>${text}</p>`;

  //TODO Add message
  chatBox.appendChild(newMessage);

  //TODO Scroll
  chatBox.scrollTop = chatBox.scrollHeight;

  messageInput.value = "";
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
