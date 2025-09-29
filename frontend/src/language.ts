export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language") as HTMLButtonElement;
export const button3 = document.createElement("button") as HTMLButtonElement;
export const button4 = document.createElement("button") as HTMLButtonElement;
export const button5 = document.createElement("button") as HTMLButtonElement;
export const button6 = document.createElement("button") as HTMLButtonElement;

button3.classList.add("btn");
button4.classList.add("btn");
button5.classList.add("btn");
button6.classList.add("btn");

button3.textContent = "BACK";
button3.style.paddingLeft = "26px";
button3.style.paddingRight = "26px";
button4.textContent = "English";
button5.textContent = "Русский";
button6.textContent = "Français";

if (nav && button1 && button2) {
    button2.addEventListener("click", () => 
    {
        button1.style.display = "none";
        button2.style.display = "none";
        nav.appendChild(button3);
        nav.appendChild(button4);
        nav.appendChild(button5);
        nav.appendChild(button6);
    });
}

button3.addEventListener("click",()=>
{
    nav.removeChild(button3);
    nav.removeChild(button4);
    nav.removeChild(button5);
    nav.removeChild(button6);
    button1.style.display = ""; // style par default
    button2.style.display = "";
})

button4.addEventListener("click",()=>
{
    // English
    nav.removeChild(button3);
    nav.removeChild(button4);
    nav.removeChild(button5);
    nav.removeChild(button6);
    button1.style.display = "";
    button2.style.display = "";
})

button5.addEventListener("click",()=>
{
    // Russe
    nav.removeChild(button3);
    nav.removeChild(button4);
    nav.removeChild(button5);
    nav.removeChild(button6);
    button1.style.display = "";
    button2.style.display = "";
})

button6.addEventListener("click",()=>
{
    //Francais
    nav.removeChild(button3);
    nav.removeChild(button4);
    nav.removeChild(button5);
    nav.removeChild(button6);
    button1.style.display = "";
    button2.style.display = "";
})