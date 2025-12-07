document.addEventListener("DOMContentLoaded", () => {
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

  //TODO Login/Register toggle
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

  //TODO Login
  createBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let username = signUpBox.querySelector('input[placeholder="Username"]').value.trim();
    let email = signUpBox.querySelector('input[placeholder="Email"]').value.trim();
    let password = signUpBox.querySelector('input[placeholder="Password"]').value;

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

    let errors = [];

    if (username.length < 4) {
      errors.push("❌ Username must be at least 4 characters");
    }

    if (!email.includes("@gmail.com")) {
      errors.push("❌ Email must be a valid Gmail address");
    }

    //TODO Password requirements
    let passwordRequirements = [];
    
    if (password.length < 6) {
      passwordRequirements.push("  • At least 6 characters");
    }

    if (!password.match(lowerCaseLetter)) {
      passwordRequirements.push("  • A lowercase letter (a-z)");
    }

    if (!password.match(upperCaseLetter)) {
      passwordRequirements.push("  • An uppercase letter (A-Z)");
    }

    if (!password.match(numbers)) {
      passwordRequirements.push("  • A number (0-9)");
    }

    if (!password.match(specialChars)) {
      passwordRequirements.push("  • A special character (!@#$%...)");
    }

    if (passwordRequirements.length > 0) {
      errors.push("❌ Password must contain:\n" + passwordRequirements.join("\n"));
    }

    //TODO Show all requirements
    if (errors.length > 0) {
      alert(errors.join("\n\n"));
      return;
    }

    //TODO Save user
    let users = [];
    
    if (localStorage.getItem("users")) {
      users = JSON.parse(localStorage.getItem("users"));

      //TODO Existing user
      if (users.some((u) => u.email === email)) {
        alert("This email is already registered!");
        return;
      }

      users.push({
        email,
        password,
        username,
      });

      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            email,
            password,
            username,
          },
        ])
      );
    }

    //TODO Success notify
    notify.classList.add("show");
    setTimeout(() => notify.classList.remove("show"), 3000);

    signUpBox.querySelector('input[placeholder="Username"]').value = "";
    signUpBox.querySelector('input[placeholder="Email"]').value = "";
    signUpBox.querySelector('input[placeholder="Password"]').value = "";
  });

  //TODO Login
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const loginInput = signInBox.querySelector('input[type="text"]').value.trim();
    const passwordInput = signInBox.querySelector('input[type="password"]').value.trim();

    if (!loginInput || !passwordInput) {
      alert("Please fill in all fields!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        (u.email === loginInput || u.username === loginInput) &&
        u.password === passwordInput
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "Home.html";
    } else {
      alert("Email/username or password is incorrect!");
    }
  });

  //TODO Theme logo
  toggle.addEventListener("click", () => {
    const body = document.body;

    if (body.classList.contains("light")) {
      body.classList.replace("light", "dark");

      logoImg.src = "/Image/LogoLight.svg";
      if (vault) vault.src = "/Image/VaultLight.svg";

      toggle.innerHTML = `<img id="themeIcon" src="/Image/lightIcon.svg" width="25"> Light`;
    } else {
      body.classList.replace("dark", "light");

      logoImg.src = "/Image/LogoDark.svg";
      if (vault) vault.src = "/Image/VaultDark.svg";

      toggle.innerHTML = `<img id="themeIcon" src="/Image/darkIcon.svg" width="25"> Dark`;
    }
  });
});