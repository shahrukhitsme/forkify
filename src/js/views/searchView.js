/*export const add = (a,b) => a + b;
export const multiply = (a,b) => a * b;
export const ID = 23;*/
import {elements} from './base';
//import { cursorTo } from 'readline';

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

const limitRecipeTitle = (title, limit=17)=>{
    const newTitle = [];
    if(title.length>limit)
    {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit)
            {
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0);

        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href=${recipe.recipe_id}>
            <figure class="results__fig">
                <img src=${recipe.image_url} alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
}

export const renderResults = recipes => {
    recipes.forEach(element => {
        renderRecipe(element);
    });
}