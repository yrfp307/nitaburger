import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerunyu307-default-rtdb.firebaseio.com/'
});

export default instance;