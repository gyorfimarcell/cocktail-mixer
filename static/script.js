const container = document.getElementById("container");
const glass = document.getElementById("glass");
const ingredients = glass.getElementsByClassName("ingredient");
const mixed = document.getElementById("mixed");
const nameEl = document.getElementById("name");

let cocktails = [];
let activeCocktail = 0;

async function FetchCocktails() {
    const resp = await fetch("/api/cocktails");
    const data = await resp.json();
    cocktails = data;
}

async function Init() {
    await FetchCocktails();
    SetCocktail();
    glass.addEventListener("click", Shake)
}

function SetCocktail() {
    const cocktail = cocktails[activeCocktail];
    
    glass.classList.remove("shaken");
    nameEl.innerHTML = cocktail.name;
    mixed.querySelector("p").innerHTML = cocktail.name;

    for (let i = 0; i < 4; i++) {
        color = cocktail[`ingredient_${i+1}`].color

        ingredients[i].style.flexGrow = cocktail[`ingredient_${i+1}_amount`];
        ingredients[i].style.backgroundColor = color;
        ingredients[i].querySelector("p").innerText = cocktail[`ingredient_${i+1}`].name;

        mixed.style.setProperty(`--color${i+1}`, color);
    }
}

function Shake() {
    glass.classList.toggle("shaken");
}

function Prev() {
    if (activeCocktail > 0) {
        activeCocktail--;
        SetCocktail();
    }
}

function Next() {
    if (activeCocktail < cocktails.length - 1) {
        activeCocktail++;
        SetCocktail();
    }
}

Init();