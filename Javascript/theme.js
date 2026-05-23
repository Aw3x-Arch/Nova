// theme.js - dùng chung cho tất cả trang
export function initTheme() {
    const toggle = document.getElementById("toggleTheme");
    const logoImg = document.getElementById("logoImg");
    const vault = document.getElementById("vault"); // null nếu trang không có

    // Áp dụng theme đã lưu khi load trang
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
    applyThemeUI(savedTheme, toggle, logoImg, vault);

    // Khi bấm toggle
    toggle.addEventListener("click", () => {
        const current = document.body.classList.contains("dark") ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        document.body.classList.replace(current, next);
        localStorage.setItem("theme", next);
        applyThemeUI(next, toggle, logoImg, vault);
    });
}

function applyThemeUI(theme, toggle, logoImg, vault) {
    if (theme === "dark") {
        if (logoImg) logoImg.src = "/Image/LogoLight.svg";
        if (vault) vault.src = "/Image/VaultLight.svg";
        if (toggle) toggle.innerHTML = `<img src="/Image/lightIcon.svg" width="25"> Light`;
    } else {
        if (logoImg) logoImg.src = "/Image/LogoDark.svg";
        if (vault) vault.src = "/Image/VaultDark.svg";
        if (toggle) toggle.innerHTML = `<img src="/Image/darkIcon.svg" width="25"> Dark`;
    }
}