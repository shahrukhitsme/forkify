/*import string from  './models/search'

import {add, multiply as mult, ID} from './views/searchView'

console.log(`Using imported functions! Addition: ${add(ID, 2)} | Multiplication: ${mult(ID, 3)}`);
*/
import axios from 'axios';

const key = '1b20d77a3b50d964b22c322e43a1e34b';
const endpoint= 'https://www.food2fork.com/api/search';
const proxyURL = 'https://cors-anywhere.herokuapp.com/'
let URL = endpoint+'?key='+key;

async function getResults(query){
    try{
    const res = await axios(proxyURL+URL+'&q='+query);
    console.log(res);
    } catch(error){
        console.log('Error: '+error);
    }
}

getResults('pizza');