const mealDataBaseURL = 'https://www.themealdb.com/api/json/v1/1'; 

export async function searchByIngredient(ingredient) {
    try {
        const response = await fetch(`${mealDataBaseURL}/filter.php?i=${encodeURIComponent(ingredient)}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        return data.meals || [];

    } catch (error) {
        console.error('Error finding recipes', error);
        return [];
    }    
}

export async function getRandomRecipe() {
    try {
        const response = await fetch(`${mealDataBaseURL}/random.php`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        if (data.meals) {
            return data.meals[0];
        } else {
            return null;
        }
        // return data.meals ? data.meals[0] : null;

    } catch (error) {
        console.error('Error finding recipes', error);
        return null;
    }
}

export async function getRecipeDetails(id) {
    try {
        const response = await fetch(`${mealDataBaseURL}/lookup.php?i=${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();

        if (data.meals) {
            return data.meals[0];
        } else {
            return null;
        }
        // return data.meals ? data.meals[0] : null;

    } catch (error) {
        console.error(`Error finding recipes`, error);
        return null;
    }
}

