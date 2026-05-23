import { initTheme } from "./theme.js";
initTheme();

import { auth, db } from "../Javascript/firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Không cần DOMContentLoaded vì type="module" tự động defer
const signInBtn = document.getElementById("SignIn");
const signUpBtn = document.getElementById("SignUp");

const signInBox = document.getElementById("SignInBox");
const signUpBox = document.getElementById("SignUpBox");

const createBtn = document.getElementById("Create");
const continueBtn = document.getElementById("Continue");

const notify = document.getElementById("Notify");

const toggle = document.getElementById("toggleTheme");
const logoImg = document.getElementById("logoImg");
const vault = document.getElementById("vault");

// Debug: kiểm tra các element có tồn tại không
console.log("createBtn:", createBtn);
console.log("continueBtn:", continueBtn);
console.log("signUpBox:", signUpBox);
console.log("signInBox:", signInBox);

// =========================
// LOGIN / REGISTER TOGGLE
// =========================
signInBtn.addEventListener("click", () => {
  signInBtn.classList.add("active");
  signUpBtn.classList.remove("active");
  signInBox.style.display = "block";
  signUpBox.style.display = "none";
});

signUpBtn.addEventListener("click", () => {
  signUpBtn.classList.add("active");
  signInBtn.classList.remove("active");
  signUpBox.style.display = "block";
  signInBox.style.display = "none";
});

// =========================
// REGISTER
// =========================
createBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Create button clicked!");

  const userInput = signUpBox.querySelector('input[type="text"]');
  const emailInput = signUpBox.querySelector('input[type="email"]');
  const passwordInput = signUpBox.querySelector('input[type="password"]');

  console.log("userInput:", userInput);
  console.log("emailInput:", emailInput);
  console.log("passwordInput:", passwordInput);

  if (!userInput || !emailInput || !passwordInput) {
    alert("LỖI: Không tìm thấy đủ input fields trong #SignUpBox!");
    return;
  }

  let username = userInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;

  let lowerCaseLetter = /[a-z]/g;
  let upperCaseLetter = /[A-Z]/g;
  let numbers = /[0-9]/g;
  let errors = [];

  if (username.length < 4) errors.push("❌ Username phải có ít nhất 4 ký tự");
  if (!email.includes("@gmail.com")) errors.push("❌ Email phải là địa chỉ Gmail hợp lệ");

  let passwordRequirements = [];
  if (password.length < 4) passwordRequirements.push(" • Ít nhất 4 ký tự");
  if (!password.match(lowerCaseLetter)) passwordRequirements.push(" • Một chữ thường");
  if (!password.match(upperCaseLetter)) passwordRequirements.push(" • Một chữ hoa");
  if (!password.match(numbers)) passwordRequirements.push(" • Một số");

  if (passwordRequirements.length > 0) {
    errors.push("❌ Mật khẩu phải chứa:\n" + passwordRequirements.join("\n"));
  }

  if (errors.length > 0) {
    alert(errors.join("\n\n"));
    return;
  }

  // FIREBASE REGISTER
  try {
    // Hiển thị thông báo thành công
    if (notify) {
      notify.classList.add("show");
      setTimeout(() => {
        notify.classList.remove("show");
      }, 3000);
    }

    // Xóa các ô input
    userInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    // Chuyển tab sang Đăng nhập
    signInBtn.classList.add("active");
    signUpBtn.classList.remove("active");
    signInBox.style.display = "block";
    signUpBox.style.display = "none";

    console.log("Bắt đầu tạo tài khoản Firebase...");

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Tạo user thành công:", user.uid);

    // updateProfile tách riêng, lỗi ở đây không crash toàn bộ flow
    try {
      await updateProfile(user, { displayName: username });
      console.log("updateProfile thành công");
    } catch (profileError) {
      console.warn("updateProfile thất bại (không nghiêm trọng):", profileError.message);
    }

    // Ghi dữ liệu vào Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      createdAt: Date.now(),
    });
    console.log("Ghi Firestore thành công!");


  } catch (error) {
    console.error("Lỗi đăng ký:", error.code, error.message);
    alert("Lỗi: " + error.message);
  }
});

// =========================
// LOGIN
// =========================
continueBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Continue button clicked!");

  const loginInputElement = signInBox.querySelector('input[type="text"]');
  const passwordInputElement = signInBox.querySelector('input[type="password"]');

  if (!loginInputElement || !passwordInputElement) {
    alert("LỖI: Không tìm thấy input fields trong #SignInBox!");
    return;
  }

  const loginInput = loginInputElement.value.trim();
  const passwordInput = passwordInputElement.value.trim();

  if (!loginInput || !passwordInput) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, loginInput, passwordInput);
    console.log("Đăng nhập thành công!");
    window.location.href = "Home.html";
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.code, error.message);
    alert("Email hoặc mật khẩu không đúng!");
  }
});