/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container by ID that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */
const favsStr = localStorage.getItem("favs");
let favorites =
  favsStr && favsStr.length > 0
    ? favsStr.split(",").map((elem) => +elem)
    : undefined;

const cardsContainer = document.querySelector(".cardsContainer");
cardsContainer.addEventListener("click", (e) => {
  if (e.target.className !== "cardsContainer") {
    clickCard(e);
  }
});

const cards = document.querySelectorAll(".card");
for (const card of cards) {
  if (favorites && favorites.includes(+card.id)) {
    setFavorited(card, true);
  }
}

function setFavorited(card, favState) {
  card.dataset.fav = `${favState}`;
  card.className = favState ? "card red" : "card";
}

function clickCard(e) {
  const stateToSet = e.target.dataset.fav === "false" ? true : false;
  setFavorited(e.target, stateToSet);

  const clickedId = +e.target.id;
  toggleIdInFavs(clickedId);
}

function toggleIdInFavs(id) {
  if (favorites) {
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id), 1);
    } else {
      favorites.push(id);
    }
  } else {
    favorites = [id];
  }
  localStorage.setItem("favs", `${favorites}`);
}
