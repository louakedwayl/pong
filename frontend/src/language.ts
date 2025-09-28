export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language");
export const button3 = document.createElement("button");
export const button4 = document.createElement("button");

button3.classList.add("btn");
button4.classList.add("btn");
button3.textContent = "Русский";
button4.textContent = "Français";

if (nav && button1 && button2) {
  button2.addEventListener("click", () => {
    button1.style.display = "none";
    button2.innerHTML = "English";
    nav.appendChild(button3);
    nav.appendChild(button4);
  });
}
