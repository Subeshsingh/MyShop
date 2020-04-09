import React,{useState} from 'react';
// import { StyleSheet} from 'react-native';
import { createStore , combineReducers } from 'redux';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {composeWithDevTools} from 'redux-devtools-extension'
import productReducer from  './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import ShopNavigator from './navigations/ShopNavigator';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer
});
const store= createStore(rootReducer,composeWithDevTools());

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
  const [fontLoaded, setFontLoaded] =useState(false);
  if(!fontLoaded) {
    return (<AppLoading startAsync={fetchFonts}
               onFinish={()=>{setFontLoaded(true)}}/>
  )};
  return (
      <Provider store={store}>
        <ShopNavigator/>
      </Provider>
  );
}
