
import {
    getVideoGames,
    generateVideogames
} from '../services/api';

export default {
    namespace: 'armando', //nombre modelo

    state: {
        videogames: []
    },

    effects: {
        /*************************************************/
        *fetchVideoGames({payload}, {call, put}){
            let consolesId= payload.payload.consolesId;
            const response =  yield call(getVideoGames, {consolesId});
            yield put({
                type: 'queryVideoGames',
                payload: response,
            });
        },
        /*************************************************/

        *generteVideoGames({payload},{call, put}){
            let consolesId=payload.payload.GET.consolesId;
            const response = yield call(generateVideogames, payload);
            const responseVideoGames = yield call(getVideoGames, {consolesId});
            yield put({
                type: 'queryVideoGames',
                payload: responseVideoGames,
            });
        },
        /*************************************************/
    },

    reducers: {
        /*******************************/
        queryVideoGames(state, action){
            return{
                ...state,
                videogames: action.payload.body.Items
            }
        },
        /*******************************/
    },
};


