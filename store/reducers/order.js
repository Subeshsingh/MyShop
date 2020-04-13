import * as actionTypes from '../actions/order';
import Order from '../../models/order';

const initialState={    
    orders: []
};

export default (state=initialState, action) =>{
    switch(action.type){ 
        case actionTypes.ADD_ORDER:
            const newOrder =  new Order(new Date().toString, 
                                action.orderData.items, 
                                action.orderData.amount,
                                 new Date());
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };                      
        break;
        default:
         return state;
    }
    
}