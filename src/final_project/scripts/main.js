import { searchByIngredient, getRandomRecipe, getRecipeDetails } from "./recipes.js";


const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const randomButton = document.querySelector('#randomButton');
const recipeContainer = document.querySelector('#recipeContainer');
const featuredImg = document.querySelector('#featuredImg');
const featuredTitle = document.querySelector('#featuredTitle');
const featuredButton = document.querySelector('#featuredButton');

function displayFeaturedRecipe(recipe) {
    const featuredImg = document.querySelector('#featuredImg');
    const featuredTitle = document.querySelector('#featuredTitle');
    const featuredButton = document.querySelector('#featuredButton')

    img.src = '';
    img.alt = '';

}

function recipeCards(recipe) {
    const template = document.querySelector('#recipeCardTemplate');
    const cardCopy = templay.content.cloneNode(true);
    const img = cardCopy.querySelector('.recipeImg');
    const title = cardCopy.querySelector('.recipeTitle');
    const button = cardCopy.querySelector('.recipeButton');
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;
    title.textContent = recipe.strMeal;
    button.dataset.id =recipe.idMeal

    return cardCopy;
}

export function displayRecipes(recipeList) {
    recipeContainer.innerHTML = '';
    
    if (!recipeList || recipeList.length === 0) {
        recipeContainer.innerHTML = 'No results found, try another search.';
        return;
    }

    recipeList.forEach(recipe => {
        const cardElement = createRecipeCard(recipe);
        recipeContainer.appendChild(cardElement);
    });
}







const year = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

const lastModified = document.getElementById('lastModified');
lastModified.textContent = `Last Modified ${document.lastModified}`;