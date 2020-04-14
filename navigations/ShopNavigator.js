import React,{ useEffect } from 'react';
import { createStackNavigator} from  'react-navigation-stack';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import { Platform,View,Button,SafeAreaView, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/user/StartupScreen';

import { authenticate } from '../store/actions/Auth';

import * as authActions from '../store/actions/Auth';

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
        },
        contentComponent: props=> {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop:50}}>
                    <SafeAreaView forceInset={{top: 'always',  horizontal: 'never'}}>
                        <DrawerItems {...props}/> 
                            <View style={styles.logoutButton}>
                                <Button
                                    title="Logout"
                                    color={Colors.primary }
                                    onPress={()=>{
                                        dispatch(authActions.logout());
                                        // props.navigation.navigate('Auth');
                                    }}
                                />
                            </View>
                    </SafeAreaView>
                </View>
            )
        }
    }
    
);

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

const styles= StyleSheet.create({
    logoutButton: {
      
    }
})
export default createAppContainer(MainNavigator);