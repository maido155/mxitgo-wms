import {
    getUsers
} from '../services/api';

export default {
    namespace: 'users', //nombre modelo

    state: {
        cognitoUsers: [] //arreglo que va a traer la pagina
    },
    effects:{
        *fetchCognitoUsers({payload}, {call, put}){
            { //Poner el payload como está en tu lambda (Variable igualita).
                const response =  yield call(getUsers); // nombre del metodo con lo que le vas a mandar
                yield put({
                    type: 'queryUsers',
                    payload: response,
                });
            }

        }
    },
    reducers:{
        queryUsers(state, action){
            return{
                ...state,
                cognitoUsers: action.payload.body.Items
            }
        }
    }
   
}
