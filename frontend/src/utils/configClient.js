import axios from 'axios';
import store from '../store';

const instance = axios.create({
    headers: 'application/json'
});

instance.defaults.headers.common['Authorization'] = store.getState().userLogin.userInfo.token;

export default instance;
