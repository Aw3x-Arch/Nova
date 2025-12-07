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

//TODO Join group
const joinButtons = document.querySelectorAll(".suggest-join .Join");

joinButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const suggestItem = btn.closest(".suggest-item");
    if (!suggestItem) return;

    const imgSrc = suggestItem.querySelector("img").src;
    const groupName = suggestItem.querySelector("h4").textContent;

    const groupList = document.querySelector(".group-list");

    const newGroupItem = document.createElement("div");

    //TODO Create box
    newGroupItem.classList.add("group-item");
    newGroupItem.innerHTML = `
      <div class="group-img">
        <img src="${imgSrc}" alt="${groupName}">
      </div>
      <div class="group-name">
        <h4>${groupName}</h4>
      </div>
    `;

    groupList.appendChild(newGroupItem);

    //TODO Remove suggestbox
    suggestItem.remove();
  });
});

//TODO Create group
const createBtn = document.getElementById("createGroupBtn");
const groupNameInput = document.getElementById("groupName");
const errorGui = document.querySelector(".error-gui");
const errorInfo = errorGui.querySelector(".error-info h2");
const successGui = document.querySelector(".success-gui");
const successInfo = successGui.querySelector(".success-info h2");

createBtn.addEventListener("click", () => {
  const name = groupNameInput.value.trim();

  //TODO Error!
  if (!name) {
    errorInfo.textContent = "Please enter a group name!";
    errorGui.classList.add("show");
    setTimeout(() => {
      errorGui.classList.remove("show");
    }, 3000);

    return;
  }

  const groupList = document.querySelector(".group-list");
  const newGroupItem = document.createElement("div");
  newGroupItem.classList.add("group-item");
  newGroupItem.innerHTML = `
    <div class="group-img">
      <img src="/Image/photo-gallery.png" alt="${name}">
    </div>
    <div class="group-name">
      <h4>${name}</h4>
    </div>
  `;

  groupList.appendChild(newGroupItem);
  groupNameInput.value = "";
  //TODO Successful
  successInfo.textContent = `Group "${name}" created successfully!`;
  successGui.classList.add("show");
  setTimeout(() => {
    successGui.classList.remove("show");
  }, 3000);
});
//TODO Theme toogle
const toggle = document.getElementById("toggleTheme");
const logoImg = document.getElementById("logoImg");
const group = document.getElementById("group");
//TODO Theme toggle
toggle.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.replace("dark", "light");
    logoImg.src = "/Image/LogoDark.svg";
    toggle.innerHTML = `<img id="themeIcon" src="/Image/darkIcon.svg" width="25"> Dark`;
    if (group) group.src = "/Image/GroupDark.svg";
  } else {
    document.body.classList.replace("light", "dark");
    logoImg.src = "/Image/LogoLight.svg";
    toggle.innerHTML = `<img id="themeIcon" src="/Image/lightIcon.svg" width="25"> Light`;
    if (group) group.src = "/Image/GroupLight.svg";
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
