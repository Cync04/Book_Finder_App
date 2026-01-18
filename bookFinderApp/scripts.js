/*
Book Finder App

Tier: 2-Intermediate

Create an application that will allow users to search for books by entering a query (Title, Author, etc). Display the resulting books in a list on the page with all the corresponding data.
User Stories

    User can enter a search query into an input field
    User can submit the query. This will call an API that will return an array of books with the corresponding data (Title, Author, Published Date, Picture, etc)
    User can see the list of books appearing on the page

Bonus features

    For each item in the list add a link that will send the User to an external site which has more information about the book
    Implement a Responsive Design
    Add loading animations

Useful links and resources

You can use the Google Books API
Example projects

Book Finder Search Books
*/
const namesURL = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureURL = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const typeColors = {
  normal: ["#A8A77A", "#000000"],
  fire: ["#EE8130", "#FFFFFF"],
  water: ["#6390F0", "#FFFFFF"],
  electric: ["#F7D02C", "#000000"],
  grass: ["#7AC74C", "#000000"],
  ice: ["#96D9D6", "#000000"],
  fighting: ["#C22E28", "#FFFFFF"],
  poison: ["#A33EA1", "#FFFFFF"],
  ground: ["#E2BF65", "#000000"],
  flying: ["#A98FF3", "#000000"],
  psychic: ["#F95587", "#FFFFFF"],
  bug: ["#A6B91A", "#000000"],
  rock: ["#B6A136", "#000000"],
  ghost: ["#735797", "#FFFFFF"],
  dragon: ["#6F35FC", "#FFFFFF"],
  dark: ["#705746", "#FFFFFF"],
  steel: ["#B7B7CE", "#000000"],
  fairy: ["#D685AD", "#000000"]
};

function capitalize(str) {
  if (typeof str !== "string") return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
const searchInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const creatureNames = document.getElementById("creature-name");
const weights = document.getElementById("weight");
const heights = document.getElementById("height");
const specialss = document.querySelector(".special");
const hps = document.getElementById("hp");
const attacks = document.getElementById("attack");
const defenses = document.getElementById("defense");
const specialAttacks = document.getElementById("special-attack");
const specialDefenses = document.getElementById("special-defense");
const speeds = document.getElementById("speed");
const canvas = document.getElementById("types");
const ctx = canvas.getContext("2d");

const fetchAllNames = async () => {
  try {
    const res = await fetch(namesURL);
    const data = await res.json();
    return extractNames(data);
  } catch (err) {
    console.log(err);
  }
};

const extractNames = (data) => {
  const allNames = [];
  for (const { name, id } of data) {
    allNames.push(name, id);
  }
  return allNames;
};

const fetchCreature = async (identifier) => {
  try {
    const res = await fetch(`${creatureURL}${identifier}`);
    const data = await res.json();
    extractStats(data);
  } catch (err) {
    console.log(err);
  }
};

const extractStats = (data) => {
  const { id, name, weight, height, special, stats, types } = data;

  creatureNames.innerHTML = `${name} #${id}`;
  weights.innerHTML = `Weight: ${weight}`;
  heights.innerHTML = `Height: ${height}`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const rectWidth = 100;
  const rectHeight = 30;
  const padding = 10;

  types.forEach(({ name }, i) => {
    if (typeof name === "string") {
      const lower = name.toLowerCase();
      const [bgColor, textColor] = typeColors[lower] || ["gray", "white"];
      const x = i * (rectWidth + padding);
      const y = 10;

      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y, rectWidth, rectHeight);

      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "16px Lucida Console";
      ctx.fillText(name.toUpperCase(), x + rectWidth / 2, y + rectHeight / 2);
    } else {
      console.warn("Invalid type name:", name);
    }
  });

  if (special) {
    const { name: specialName, description } = special;
    specialss.innerHTML = `
      <h2>${capitalize(specialName)}</h2>
      <p>${description}</p>
    `;
  }

  stats.forEach(({ name, base_stat }) => {
    const element = document.getElementById(name);
    if (element) {
      element.innerHTML = base_stat;
    }
  });
};
button.addEventListener("click", () => {
  fetchAllNames().then((verifiedNames) => {
    let id;
    if((parseInt(searchInput.value) >= 1 && parseInt(searchInput.value) <= 20)){
       id = parseInt(searchInput.value)
    } else {
       id = searchInput.value
    }
    if (verifiedNames.includes(id)) {
      fetchCreature(id);
    } else {
      alert("Creature not found.")
    }
  });
});