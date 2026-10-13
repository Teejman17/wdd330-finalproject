export function getFavorites() {
    const favorites = localStorage.getItem('recipeFavorites');
    return favorites ? JSON.parse(favorites) : [];
}

export function getGroceryList() {
    return JSON.parse(localStorage.getItem('recipeGroceryList')) || [];
}

export function saveFavorites(recipe) {
    let favorites = getFavorites();
    const index = favorites.findIndex(fav => fav.idMeal === recipe.idMeal);

    if (index > -1) {
        favorites.splice(index, 1)
    } else {
        favorites.push({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb
        });
    }

    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
}

export function addIngredients(recipe) {
    let groceryList = localStorage.getItem('recipeGroceryList');
    groceryList = groceryList ? JSON.parse(groceryList) : [];

    for (let i = 1; i <= 28; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            const recipeDetail = `${measure ? measure : ''} ${ingredient}`.trim();
            if (!groceryList.includes(recipeDetail)) {
                groceryList.push(recipeDetail);
            }
        } else {
            break;
        }
    }

    localStorage.setItem('recipeGroceryList', JSON.stringify(groceryList));
}