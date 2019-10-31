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
    elements.searchResPages.innerHTML = '';
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

//type: prev or next
const createButton = (page, type) => {return `
    <button class="btn-inline results__btn--${type}" data-goto=${type=='prev'?page-1:page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type=='prev'?'left':'right'}"></use>
        </svg>
        <span>Page ${type=='prev'?page-1:page+1}</span>
    </button>`};

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    console.log(page+" "+pages+" "+numResults+" "+resPerPage);
    if(page === 1 && pages > 1)
    {
        //Only button to go to next page
        button = createButton(page, 'next');
    }
    else if(page < pages)
    {
        //Both buttons
        button = `${createButton(page, 'prev')}
                  ${createButton(page, 'next')}`;
    }
    else if(page === pages && pages > 1)
    {
        //Only button to go to previous page
        button = createButton(page, 'prev');
    }
    console.log(button);
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage=10) => {
    const start = (page -1)*resPerPage;
    const end = start+resPerPage;
    recipes.slice(start,end).forEach(element => {
        renderRecipe(element);
    });

    renderButtons(page, recipes.length, resPerPage);
}