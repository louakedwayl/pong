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


document.addEventListener("keydown", (event) => {
    let maxY = 400; // 40% de la hauteur de l'écran
    let minY = -400; // -40% de la hauteur de l'écran
    
    if (event.key === "ArrowDown") {
        posY = Math.min(posY + 5, maxY); // incréments plus petits en %
    }
    else if (event.key === "ArrowUp") {
        posY = Math.max(posY - 5, minY);
    }
    playerPaddle.style.transform = `translateY(calc(-50% + ${posY}%))`;
  
});


  // aspect-ratio: 4/3;   /* Format classique Pong */
    
  // width: 1150px;
  // height: auto;