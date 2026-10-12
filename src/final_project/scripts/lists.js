import { getFavorites, addIngredients } from "./storage.js";

export function displayFavorites(recipeContainer) {
    const favorites = getFavorites();
    if (favorites.length === 0) {
        recipeContainer.innerHTML = '<h2>Favorites</h2><p>No favorites yet</p>';
        return;
    }

    recipeContainer.innerHTML = '<h2>Favorites</h2>' + favorites.map(r => `<div><h3>${r.strMeal}</h3></div>`).join('');
}

export function displayGroceryList(recipeContainer) {
    const list = addIngredients();
    if (list.length === 0) {
        recipeContainer.innerHTML = '<h2>Grocery List</h2><p>Nothing currently in list.</p>';
        return;
    }

    recipeContainer.innerHTML = `<h2>Grocery List</h2><ul>` + list.map(item => `<li>${item}</li>`).join('') + `</ul>`;
}