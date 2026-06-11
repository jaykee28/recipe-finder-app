import ApiService from './modules/ApiService.mjs';

const api =
  new ApiService();

const searchBtn =
  document.querySelector(
    '#searchBtn'
  );

const searchInput =
  document.querySelector(
    '#searchInput'
  );

const recipeList =
  document.querySelector(
    '.recipe-list'
  );

  const categoryFilter =
  document.querySelector(
    '#categoryFilter'
  );

function recipeTemplate(recipe) {

  return `
  
    <a
      href="/src/recipe/index.html?id=${recipe.idMeal}"
      class="recipe-card"
    >

      <img
        src="${recipe.strMealThumb}"
        alt="${recipe.strMeal}"
      />

      <div class="recipe-card-content">

        <h3>
          ${recipe.strMeal}
        </h3>

        <p>
          ${recipe.strCategory}
        </p>

      </div>

    </a>
  `;
}

function renderRecipes(recipes) {

  if (!recipes || recipes.length === 0) {

    recipeList.innerHTML =
      '<p>No recipes found.</p>';

    return;
  }

  recipeList.innerHTML =
    recipes
      .map(recipeTemplate)
      .join('');
}

searchBtn.addEventListener(
  'click',
  async () => {

    const query =
      searchInput.value;

    const recipes =
      await api.searchRecipes(
        query
      );

    let filteredRecipes =
  recipes;

if (
  categoryFilter.value !== ''
) {

  filteredRecipes =
    recipes.filter(
      recipe =>
        recipe.strCategory ===
        categoryFilter.value
    );
}

renderRecipes(
  filteredRecipes
);
  }
);

const randomBtn =
  document.querySelector(
    '#randomBtn'
  );

  

randomBtn.addEventListener(
  'click',
  async () => {

    const recipe =
      await api.getRandomRecipe();

    window.location.href =
      window.location.href =
  `/src/recipe/index.html?id=${recipe.idMeal}`;
  }
);