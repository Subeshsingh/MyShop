import React from 'react';
import { FlatList,Button,Alert,Platform,View,Text} from 'react-native';
import { useSelector ,useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

import ProductItem from '../../components/shop/ProductItem';
import * as actionProduct from '../../store/actions/product';

const UserProductScreen = props => {
    const userProducts = useSelector( state => state.products.userProducts)
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text: 'No', style:'cancel'},
            {text: 'Yes', style: 'destructive', onPress: ()=>{
                dispatch(actionProduct.deleteProduct(id))
            } }
        ]);
    };
    
    const editProductHandler = id => {
        props.navigation.navigate('EditProduct',{productId: id});
    } 
    if (userProducts.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No products found, maybe start adding some products?</Text>
          </View>
        );
      }
    return <FlatList data={userProducts} keyExtractor={item => item.id}
                renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
                                            title={itemData.item.title}
                                            price={itemData.item.price}    
                                            onSelect={()=>{editProductHandler(itemData.item.id)}}
                                         >
                                            <Button
                                                color={Colors.primary}
                                                title="Edit"
                                                onPress={()=>{
                                                    editProductHandler(itemData.item.id)
                                                }}
                                            />
                                            <Button
                                                color={Colors.primary}
                                                title="Delete"
                                                onPress={deleteHandler.bind(this,itemData.item.id)}
                                            />
                                        </ProductItem>}
           />;
}

UserProductScreen.navigationOptions = navData =>{
   return {  headerTitle: 'Your Products',
    headerLeft: ()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                            onPress={()=>{
                                navData.navigation.toggleDrawer();
                            }}/>
                        </HeaderButtons>,
     headerRight: ()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
     <Item title="Add" iconName={Platform.OS === 'android' ? 'md-add-circle-outline' : 'ion-ios-add-circle-outline'} 
         onPress={()=>{
             navData.navigation.navigate('EditProduct');
         }}/>
     </HeaderButtons>,
    }
}

// const styles=StyleSheet.create({
//     destructive:{
//         color:'red',
//     }
// })
export default  UserProductScreen;
