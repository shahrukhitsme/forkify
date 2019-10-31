import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(query){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '1b20d77a3b50d964b22c322e43a1e34b';
        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);
        }catch(error){
            console.log('Error: '+error);
        }
    }
}