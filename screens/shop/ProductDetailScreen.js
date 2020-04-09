import React from 'react';
import {
ScrollView,
View,
Text,
Image,
Button,
StyleSheet
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find( prod => prod.id === productId));
    const dispatch= useDispatch();

    return (
       <ScrollView>
           <Image style={styles.image}source={{uri: selectedProduct.imageUrl}}/>
           <View style={styles.actions}>
                <Button color={Colors.primary}title="Add to Cart" onPress={()=>{
                    dispatch(cartActions.addToCart(selectedProduct))
                }}/>
           </View>
           <Text style={styles.price}>Rs{selectedProduct.price.toFixed(2)}</Text>
           <Text style={styles.description}>{selectedProduct.description}</Text>
       </ScrollView>
    )}

ProductDetailScreen.navigationOptions = navData => {
    // console.log(navData.navigation.getParam('productTitle'));
    const spacer= '  ';
    const deatils= 'Details'
    const prodName= navData.navigation.getParam('productTitle');
    return {
        headerTitle: `${deatils}${spacer}${prodName}`

    };
}

const styles=StyleSheet.create({
    image:{
        width:'100%',
        height: 300,
    },
    price:{
        fontSize:20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily:'open-sans-bold'
    },
    description:{
        fontFamily: 'open-sans',
        fontSize:14,
        textAlign:'center',
        marginHorizontal: 20
    },
    actions:{
        alignItems:"center",
        marginVertical: 10
    }
})

export default ProductDetailScreen;