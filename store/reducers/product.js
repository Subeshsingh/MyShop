import PRODUCTS from '../../data/dummy-data';
import * as actionTypes from '../actions/product';
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
    userProducts: [],
}

export default (state = initialState, action) => {
    switch(action.type){
         // id, ownerId, title, imageUrl, description, price
         case actionTypes.SET_PRODUCTS: 
          return{
              availableProducts: action.products,
              userProducts: action.products.filter(prod => prod.ownerId === 'u1'),
          }
          break;
         case actionTypes.CREATE_PRODUCT:
           const newProduct= new Product(   action.productData.id, 
                                            'ul',
                                            action.productData.title,
                                            action.productData.imageUrl,
                                            action.productData.description,
                                            action.productData.price
                                        );
            return{
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }
           break;
          case actionTypes.UPDATE_PRODUCT:
           
              const productIndex= state.userProducts.findIndex(prod => prod.id === action.productId)
              const updatedProduct = new Product(
                  action.productId,
                  state.userProducts[productIndex].ownerId,
                  action.productData.title,
                  action.productData.imageUrl,
                  action.productData.description,
                  state.userProducts[productIndex].price,
                );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex]= updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.productId);
            const updatedAvailibaleProducts = [...state.availableProducts];
            updatedAvailibaleProducts[availableProductIndex] = updatedProduct;

            return{
                ...state,
                availableProducts: updatedAvailibaleProducts,
                userProducts: updatedUserProducts
            }
           break;   
          case actionTypes.DELETE_PRODUCT:
              return {
                  ...state,
                  userProducts: state.userProducts.filter(
                      product => product.id !== action.productId
                   ),
                   availableProducts: state.availableProducts.filter(
                    product => product.id !== action.productId
                   ),
              }
            break;
          default:
            return state;
    }
    
}