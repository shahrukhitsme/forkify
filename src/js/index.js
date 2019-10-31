/*import string from  './models/search'

import {add, multiply as mult, ID} from './views/searchView'

console.log(`Using imported functions! Addition: ${add(ID, 2)} | Multiplication: ${mult(ID, 3)}`);
*/
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/**Global state of the app
--Search oobject
--Current recipe object
--Shopping list object
--Liked recipes
**/
const state = {};

const controlSearch = async () => {
    // 1) Get the query from the view
    var query = searchView.getInput();

    if(query)
    {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();

        console.log("Results:");
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
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