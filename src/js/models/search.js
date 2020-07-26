import axios from 'axios';
import {key, proxy} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(query){
        try{
            const rec = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = rec.data.recipes;
            console.log(rec);
        }catch(error){
            console.log('Error: '+error);
        }
    }
}