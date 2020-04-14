import * as actionAuth from '../actions/Auth';

const initialState = {
    token:null,
    userId:null
};

export default (state = initialState, action) =>{
    switch(action.type) {
        case actionAuth.AUTHENTICATE:
            console.log("From auth reducer"+ action.token +" ; " + action.userId)
            return{
                token: action.token,
                userId: action.userId
            };
         break;
        case actionAuth.LOGOUT:
            return initialState;
         break; 
        default:
            return state;    
    }
};