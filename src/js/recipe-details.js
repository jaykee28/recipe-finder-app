import ApiService from './modules/ApiService.mjs';

const api =
  new ApiService();

const detailsContainer =
  document.querySelector(
    '.recipe-details'
  );

const params =
  new URLSearchParams(
    window.location.search
  );

const recipeId =
  params.get('id');

async function loadRecipe() {

  const recipe =
    await api.getRecipeById(
      recipeId
    );

  renderRecipe(recipe);
}

function generateIngredients(recipe) {

  let ingredients = '';

  for (let i = 1; i <= 20; i++) {

    const ingredient =
      recipe[`strIngredient${i}`];

    const measure =
      recipe[`strMeasure${i}`];

    if (
      ingredient &&
      ingredient.trim() !== ''
    ) {

      ingredients += `
        <li>
          ${measure} ${ingredient}
        </li>
      `;
    }
  }

  return ingredients;
}

function renderRecipe(recipe) {

  detailsContainer.innerHTML = `

    <div class="recipe-detail-card">

      <img
        src="${recipe.strMealThumb}"
        alt="${recipe.strMeal}"
      />

      <div class="recipe-detail-content">

        <h2>
          ${recipe.strMeal}
        </h2>

        <p>
          <strong>Category:</strong>
          ${recipe.strCategory}
        </p>

        <p>
          <strong>Area:</strong>
          ${recipe.strArea}
        </p>

        <button
          class="favorite-btn"
        >
          ❤️ Save to Favorites
        </button>

        <h3>
        Ingredients
        </h3>

        <ul class="ingredients-list">
            ${generateIngredients(recipe)}
        </ul>

        
        <h3>
          Instructions
        </h3>

        <div class="instructions">
  ${recipe.strInstructions
    .split('.')
    .filter(step => step.trim() !== '')
    .map(step => `<p>${step.trim()}.</p>`)
    .join('')}
</div>

      ${recipe.strYoutube ? `
  <h3>Video Tutorial</h3>

  <a
    href="${recipe.strYoutube}"
    target="_blank"
    class="video-btn"
  >
    ▶ Watch on YouTube
  </a>
` : ''}

      </div>

    </div>
  `;

  const favoriteBtn =
    document.querySelector(
      '.favorite-btn'
    );

  favoriteBtn.addEventListener(
    'click',
    () => {
      saveFavorite(recipe);
    }
  );
}

function saveFavorite(recipe) {

  let favorites =
    JSON.parse(
      localStorage.getItem(
        'favorites'
      )
    ) || [];

  const exists =
    favorites.find(
      (item) =>
        item.idMeal === recipe.idMeal
    );

  if (!exists) {

    favorites.push(recipe);

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    );

    alert(
      'Recipe saved to favorites!'
    );

  } else {

    alert(
      'Recipe already saved.'
    );
  }
}

loadRecipe();