const nav = document.querySelector("nav") as HTMLElement;
const button1 = document.querySelector("button.game") as HTMLButtonElement;
const playerPaddle = document.querySelector(".paddle.left") as HTMLElement;

const button2 = document.querySelector("button.language");
const button3 = document.createElement("button");
const button4 = document.createElement("button");

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


// game 


if (nav && button1 && playerPaddle)
{
  button1.addEventListener("click", () => {
    playerPaddle.classList.add("blink");
  });
}

let posY = 0;
const maxY = 400; // adjust based on your game area height
const minY = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    posY = posY + 10;
  }
  else if (event.key === "ArrowUp") {
    posY = posY - 10;
  }
  
  playerPaddle.style.transform = `translateY(${posY}px)`;
});