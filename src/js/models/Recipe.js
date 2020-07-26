import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            this.calcTime();
            this.calcServings();
        }catch(e){
            console.log(e);
        }
    }

    calcTime() {
        //Assuming that 3 ingredients take 15 minutes
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients/4);
        this.time = `${periods * 15}`;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const newIngredients = this.ingredients.map(el =>{
            //Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) =>{
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            //Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            //Parse ingredients into count, unit, and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 =>{
                unitShort.includes(el2)
            });
            let objIng;
            if(unitIndex > -1){
                //There is a unit
                const arrCount = arrIng.slice(s0, unitIndex); //Ex: 4 1/2 cups, arrCount: [4, 1/2]
                let count;
                if(arrCount.length === 1)
                    count = eval(arrIng[0].replace('-','+'));
                else
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                objIng ={
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                };
            } else if(parseInt(arrIng[0],10)){
                //There is no unit but a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else{
                //There is niether unit nor number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}