import * as actionTypes from '../actions/order';
import Order from '../../models/order';

const initialState={    
    orders: []
};

export default (state=initialState, action) =>{
    switch(action.type){ 
        case actionTypes.SET_ORDERS:
            return{
                orders: action.orders
            };
         break;
        case actionTypes.ADD_ORDER:
            const newOrder =  new Order(
                                action.orderData.id, 
                                action.orderData.items, 
                                action.orderData.amount,
                                action.orderData.date);
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };                      
         break;
        default:
         return state;
    }
}