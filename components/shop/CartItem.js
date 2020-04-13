import React from 'react';
import { View,StyleSheet, Text,TouchableOpacity, Platform } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const CartItem = props => { 
    return <View style={styles.cartItems}>
        <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity}  </Text>
            <Text style={styles.maintext}>{props.title}</Text>
        </View>
        <Text style={styles.border}></Text>
        <View style={styles.itemDataPrice}>
            <Text style={styles.maintext}>Rs.{props.amount.toFixed(2)} </Text>
           {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={23} color="red"/>
            </TouchableOpacity> }
        </View>
    </View>
}

const styles= StyleSheet.create ({
    cartItems:{
        padding: 10,
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal: 1,
        flexWrap: 'wrap'
    },
    itemData:{
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        flexDirection:'row',
        marginRight:20
    },
    itemDataPrice:{
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 5,
        flexWrap:'wrap'
    },
    maintext:{
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    quantity:{
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    deleteButton:{
      marginLeft: 20,
      alignSelf:'auto'
    },
    border:{
        
    }
});

export default CartItem;