const baseURL =
  'https://www.themealdb.com/api/json/v1/1/';

export default class ApiService {

  async searchRecipes(query) {

    try {

      const response =
        await fetch(
          `${baseURL}search.php?s=${query}`
        );

      const data =
        await response.json();

      return data.meals;

    } catch (error) {

      console.log(error);

      return [];

    }
  }

async getRecipeById(id) {

  try {

    const response =
      await fetch(
        `${baseURL}lookup.php?i=${id}`
      );

    const data =
      await response.json();

    return data.meals[0];

  } catch (error) {

    console.log(error);

  }
}
}

