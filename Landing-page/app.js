let button = document.querySelector("#mode");

function changetheam() {
    const currentTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = currentTheme;
    button.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";
   }
button.addEventListener("click", changetheam);
