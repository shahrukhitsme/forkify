/*import string from  './models/search'

import {add, multiply as mult, ID} from './views/searchView'

console.log(`Using imported functions! Addition: ${add(ID, 2)} | Multiplication: ${mult(ID, 3)}`);
*/
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';
import Recipe from './models/Recipe';

/**Global state of the app
--Search oobject
--Current recipe object
--Shopping list object
--Liked recipes
**/
const state = {};

/**
 * SEARCH CONTROLLER 
 **/

const controlSearch = async () => {
    // 1) Get the query from the view
    var query = searchView.getInput();
    if(query)
    {
            try{
            // 2) New search object and add to state
            state.search = new Search(query);

            // 3) Prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);
            console.log('loading');
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();

            console.log("Results:");
            console.log(state.search.result);
            searchView.renderResults(state.search.result);
        }catch(e){
            console.log(e);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //Will prevent reloading of window
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn)
    {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/**
 * RECIPE CONTROLLER 
 **/

elements.searchResultList.addEventListener('click', e=>{
    e.preventDefault();
    const recId = e.target.closest('.results__link').getAttribute('href');
    console.log(recId);
    controlRecipe(recId);    
});

const controlRecipe = async (recId) => {
    if(recId)
    {
        try{
            //Prepare UI for changes

            //Create new recipe object
            state.recipe = new Recipe(recId);

            //Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Render Recipe
            console.log(state.recipe);
            recipeView.clearResults();
            recipeView.renderRecipe(state.recipe);
        }
        catch(e){
            console.log(e);
        }
    }
};