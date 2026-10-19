let button = document.querySelector("#mode");
document.body.dataset.theme = localStorage.getItem("theme") || "dark";

function changetheam() {
    const currentTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = currentTheme;
    button.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";
    localStorage.setItem("theme", currentTheme);

}
button.addEventListener("click", changetheam);
