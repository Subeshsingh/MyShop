import * as actionType from '../actions/cart';
import * as actionOrderType from '../actions/order';
import * as actionProduct from '../actions/product';
import CartItem from '../../models/cart-item'
const initialState = { 
    items: {},
    totalAmount: 0
}

export default (state=initialState,action)=>{
    switch(action.type){
        case actionType.ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let upadatedOrNewCartItem;
            if(state.items[addedProduct.id]){
                //alreday have the item in the cart;
                 upadatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            }else{
                 upadatedOrNewCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice);
                }
            return{
                ...state,
                items: { ...state.items, [addedProduct.id]: upadatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            }
            break;
        case actionType.REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            const currentQty = selectedCartItem.quantity;
            let upadatedCartItems
            if(currentQty > 1){
                // Need to reduce
                 const upadatedCartItem = new CartItem(
                    selectedCartItem.quantity-1,
                    selectedCartItem.prodPrice,
                    selectedCartItem.prodTitle,
                    selectedCartItem.sum-selectedCartItem.prodPrice );
                    upadatedCartItems = {...state.items,[action.productId]: upadatedCartItem}
            }else{
                upadatedCartItems = {...state.items};
                delete upadatedCartItems[action.productId];
            }
            return{
                ...state,
                items: upadatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.prodPrice
            };
            break;
        case actionOrderType.ADD_ORDER:
            return initialState;
        break;
        case actionProduct.DELETE_PRODUCT:
            if(!state.items[action.productId]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = updatedItems[action.productId].sum; 
            delete updatedItems[action.productId];
            return{
                ...state,
                items: updatedItems ,
                totalAmount: state.totalAmount - itemTotal
            }
        default:
            return state;
    }
}