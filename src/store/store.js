import basket from './basket';
import { createStore } from 'vuex';


const store = createStore ({
    modules: { basket }
});

export default store