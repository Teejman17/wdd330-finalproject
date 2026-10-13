const spoonacularKey = '06869c5b0f7443a2b8909a900d301071';

export async function getRecipeNutrition(recipeTitle) {
    try {
        let cleanString = recipeTitle.replace(/[&]/g, 'and').trim();
        let url = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(cleanString)}&apiKey=${spoonacularKey}`);
        let response = await url.json();

        if (!response.results || response.results.length === 0) {
            const recipeName = recipeTitle.split(' ');
            if (recipeName.length > 1) {
                cleanString = `${recipeName[0]} ${recipeName[1]}`;
                const secondaryUrl = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(cleanString)}&apiKey=${spoonacularKey}`);
                response = await secondaryUrl.json();
            }
        }

        console.log("Spoonacular search results for:", recipeTitle, response);

        if (!response.results || response.results.length === 0) {
            return null;
        }

        const spoonaculaId = response.results[0].id;
        const nutrition = await fetch(`https://api.spoonacular.com/recipes/${spoonaculaId}/nutritionWidget.json?apiKey=${spoonacularKey}`);
        const nutritionResponse = await nutrition.json();

        return nutritionResponse;
    } catch (error) {
        console.error('Error obtaining nutritional information', error);
        return null;
    }
}