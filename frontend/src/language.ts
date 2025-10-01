import { buttonGamePause, buttonGameBack} from "./game_utils.js";

export const nav = document.querySelector("nav") as HTMLElement;
export const button1 = document.querySelector("button.game") as HTMLButtonElement;
export const button2 = document.querySelector("button.language") as HTMLButtonElement;
export const button3 = document.createElement("button") as HTMLButtonElement;
export const button4 = document.createElement("button") as HTMLButtonElement;
export const button5 = document.createElement("button") as HTMLButtonElement;
export const button6 = document.createElement("button") as HTMLButtonElement;
export const mainP = document.querySelector("main p") as HTMLElement;
export const footerP = document.querySelector("footer p") as HTMLElement;
export const footerlink = document.querySelector("footer a") as HTMLElement;


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

let current :string = "en-US";

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

async function switch_language (language :string)
{
    if (language == current)
        return ;
    current = language;
    try 
    {
        const response = await fetch ("/locales/" + current + ".json");
        const localesfiles = await response.json();
        mainP.textContent = localesfiles.main;
        button1.textContent = localesfiles.newGame;
        button2.textContent = localesfiles.language;
        button3.textContent = localesfiles.back;
        buttonGamePause.textContent = localesfiles.pause;
        buttonGameBack.textContent = localesfiles.back;
        footerP.childNodes[0].textContent = localesfiles.license;
        console.log(footerlink.textContent);
        footerlink.textContent = localesfiles.licenseLink;
        console.log(footerlink.textContent);
        nav.removeChild(button3);
        nav.removeChild(button4);
        nav.removeChild(button5);
        nav.removeChild(button6);
        button1.style.display = "";
        button2.style.display = "";
    }
    catch(error)
    {
        alert ("Failed to load the language file.")
        console.error(error);
    }
}

button4.addEventListener( "click", ()=>{ switch_language("en-US");});
button5.addEventListener( "click", ()=>{ switch_language("ru-RU");});
button6.addEventListener( "click", ()=>{ switch_language("fr-FR");});
