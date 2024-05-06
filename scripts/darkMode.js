const modeButton = document.querySelector("#darkMode");
const body = document.querySelector("body");

modeButton.addEventListener("click", () => {
	if (modeButton.textContent.includes("☾")) {
		body.style.background = "#060C0C";
		body.style.color = "white";
		modeButton.textContent = "☼";
	} else {
		body.style.background = "white";
		body.style.color = "black";
		modeButton.textContent = "☾";
	}
});