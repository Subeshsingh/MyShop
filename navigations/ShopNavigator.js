import React from 'react';
import { createStackNavigator} from  'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Platform } from 'react-native'
import Colors from '../constants/Colors';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS ==='android' ? 'white' : Colors.primary
};

const ProductNavigator = createStackNavigator(
    {
        ProductsOverview : ProductOverviewScreen,
        ProductDetail : ProductDetailScreen,
        Cart : CartScreen,
    },{
        navigationOptions:{
        drawerIcon: drawerConfig => 
         <Ionicons name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
           size={23} color={drawerConfig.tintColor}/>
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrderScreen
    },
    {
        navigationOptions:{
            drawerIcon: drawerConfig => 
             <Ionicons name={Platform.OS === 'android' ? 'md-list': 'ios-list'}
               size={23} color={drawerConfig.tintColor}/>
        },
        defaultNavigationOptions: defaultNavOptions
    }
);
const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions:{
            drawerIcon: drawerConfig => 
             <Ionicons name={Platform.OS === 'android' ? 'md-create': 'ios-create'}
               size={23} color={drawerConfig.tintColor}/>
        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator
    },{
        contentOptions: {
            activeTintColor: Colors.primary
        }
    }
);

export default createAppContainer(ShopNavigator);