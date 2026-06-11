const favoritesContainer =
  document.querySelector(
    '.favorites-container'
  );

function getFavorites() {

  return (
    JSON.parse(
      localStorage.getItem(
        'favorites'
      )
    ) || []
  );
}

function renderFavorites() {

  const favorites =
    getFavorites();

  if (
    favorites.length === 0
  ) {

    favoritesContainer.innerHTML =
      '<h2>No favorite recipes yet.</h2>';

    return;
  }

  favoritesContainer.innerHTML =
    favorites
      .map(
        (recipe) => `
        
        <div class="favorite-card">

          <img
            src="${recipe.strMealThumb}"
            alt="${recipe.strMeal}"
          />

          <h3>
            ${recipe.strMeal}
          </h3>

          <button
            class="remove-btn"
            data-id="${recipe.idMeal}"
          >
            Remove
          </button>

        </div>
      `
      )
      .join('');

  addRemoveEvents();
}

function addRemoveEvents() {

  const buttons =
    document.querySelectorAll(
      '.remove-btn'
    );

  buttons.forEach(
    (button) => {

      button.addEventListener(
        'click',
        () => {

          removeFavorite(
            button.dataset.id
          );
        }
      );
    }
  );
}

function removeFavorite(id) {

  let favorites =
    getFavorites();

  favorites =
    favorites.filter(
      (recipe) =>
        recipe.idMeal !== id
    );

  localStorage.setItem(
    'favorites',
    JSON.stringify(
      favorites
    )
  );

  renderFavorites();
}

renderFavorites();