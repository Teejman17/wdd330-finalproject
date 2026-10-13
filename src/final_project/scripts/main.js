import { searchByIngredient, getRandomRecipe, getRecipeDetails } from "./recipes.js";
import { getFavorites, addIngredients, saveFavorites } from "./storage.js";
import { displayFavorites, displayGroceryList } from "./lists.js";
import { getRecipeNutrition } from "./nutrition.js";

const navigation = document.querySelectorAll('nav li');
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const randomButton = document.querySelector('#randomButton');
const recipeContainer = document.querySelector('#recipeContainer');
const featuredImg = document.querySelector('#featuredImg');
const featuredTitle = document.querySelector('#featuredTitle');
const featuredButton = document.querySelector('#featuredButton');
const recipeModal = document.querySelector('#recipeModal')
const closeModal = document.querySelector('#closeModal');
const modalDetails = document.querySelector('#modalDetails');
const navFavorites = document.querySelector('#navFavorites');
const navGrocery = document.querySelector('#navGrocery');

navigation.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigation.forEach(l => l.classList.remove('current'));
        e.currentTarget.classList.add('current');

        const favorite = link.querySelector('a');
        if (favorite && favorite.id === 'navFavorites') {
            displayFavorite();
        }
    });
});

function displayFeaturedRecipe(recipe) {
    const featuredImg = document.querySelector('#featuredImg');
    const featuredTitle = document.querySelector('#featuredTitle');
    const featuredButton = document.querySelector('#featuredButton')

    // img.src = '';
    // img.alt = '';

}

function createRecipeCard(recipe) {
    const template = document.querySelector('#recipeCardTemplate');
    const cardCopy = template.content.cloneNode(true);
    const img = cardCopy.querySelector('.recipeImg');
    const title = cardCopy.querySelector('.recipeTitle');
    const button = cardCopy.querySelector('.recipeButton');
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;
    img.loading = 'lazy';
    title.textContent = recipe.strMeal;
    button.dataset.id = recipe.idMeal

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

async function loadFeaturedRecipe() {
    const recipe = await getRandomRecipe();
    if (recipe) {
        featuredImg.src = recipe.strMealThumb;
        featuredImg.alt = recipe.strMeal;
        featuredTitle.textContent = recipe.strMeal;
        featuredButton.dataset.id = recipe.idMeal;
    }
}

featuredButton.addEventListener('click', async () => {
    const recipe = await featuredButton.dataset.id;
    if (recipe) {
        openRecipeModal(recipe);
    }
});

searchButton.addEventListener('click', async () => {
    const ingredient = searchInput.value.trim();
    if (ingredient) {
        const results = await searchByIngredient(ingredient);
        displayRecipes(results);
    }
});

searchInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const ingredient = searchInput.value.trim();
        if (ingredient) {
            const results = await searchByIngredient(ingredient);
            displayRecipes(results);
        }
    }
});

randomButton.addEventListener('click', async () => {
    const recipe = await getRandomRecipe();
    if(recipe) {
        displayRecipes([recipe]);
    }
});

loadFeaturedRecipe();

recipeContainer.addEventListener('click', (e) => {
    const button = e.target.closest('.recipeButton');
    if (button) {
        const recipeId = button.dataset.id;
        if (recipeId) {
            openRecipeModal(recipeId);
        }
    }
});


async function openRecipeModal(recipeId) {
    const recipe = await getRecipeDetails(recipeId);
    if (!recipe) return;

    modalDetails.innerHTML = '';

    const template = document.querySelector('#recipeModalTemplate');
    const modalCopy = template.content.cloneNode(true);
    const img = modalCopy.querySelector('.modalImg');
    const title = modalCopy.querySelector('.modalTitle');
    const ingredients = modalCopy.querySelector('.modalIngredients');
    const instructions = modalCopy.querySelector('.modalInstructions');
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;
    img.loading = 'lazy';
    title.textContent = recipe.strMeal;
    instructions.textContent = recipe.strInstructions;
    const favoriteButton = modalCopy.querySelector('#favoriteButton');
    const groceryButton = modalCopy.querySelector('#groceryButton');

    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            const modalDetail = document.createElement('li');
            modalDetail.textContent = `${measure ? measure : ''} ${ingredient}`.trim();
            ingredients.appendChild(modalDetail);
        } else {
            break;
        }
    }

    const calories = modalCopy.querySelector('.calories');
    const protein = modalCopy.querySelector('.protein');
    const carbs = modalCopy.querySelector('.carbs');
    const fat = modalCopy.querySelector('.fat');

    const nutritionData = await getRecipeNutrition(recipe.strMeal);

    if (nutritionData && nutritionData.calories) {
        calories.textContent = `Calories: ${nutritionData.calories}`;
        protein.textContent = `Protein: ${nutritionData.protein}`;
        carbs.textContent = `Carbs: ${nutritionData.carbs}`;
        fat.textContent = `Fat: ${nutritionData.fat}`;
    } else {
        calories.textContent = 'Unable to locate nutritional information.';
        protein.textContent = '';
        carbs.textContent = '';
        fat.textContent = '';
    }

    let favorites = getFavorites();
    const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    favoriteButton.innerHTML = isFavorite ? '&hearts; Remove from Favorites' : '&hearts; Save to Favorites';

    favoriteButton.addEventListener('click', () => {
        saveFavorites(recipe);
        const newFavorites = getFavorites();
        const favorites = newFavorites.some(fav => fav.idMeal === recipe.idMeal);
        favoriteButton.innerHTML = favorites ? '&hearts; Remove from Favorites' : '&hearts; Save to Favorites';
    });

    groceryButton.addEventListener('click',() => {
        addIngredients(recipe);
    });

    modalDetails.appendChild(modalCopy);
    recipeModal.showModal();
}

closeModal.addEventListener('click', () => {
    recipeModal.close();
});

function displayFavorite() {
    const favoriteContainer = document.querySelector('.favoritesContainer');
    if (!favoriteContainer) return;

    favoriteContainer.innerHTML = '';
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        favoriteContainer.innerHTML = 'You currently have no favorites.';
        return;
    }

    favorites.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        favoriteContainer.appendChild(recipeCard);
    });
}

if (navFavorites) {
    navFavorites.addEventListener('click', (e) => {
        e.preventDefault();
        displayFavorites(recipeContainer);
    });
}

if (navGrocery) {
    navGrocery.addEventListener('click', (e) => {
        e.preventDefault();
        displayGroceryList(recipeContainer);
    });
}


const year = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

const lastModified = document.getElementById('lastModified');
lastModified.textContent = `Last Modified ${document.lastModified}`;