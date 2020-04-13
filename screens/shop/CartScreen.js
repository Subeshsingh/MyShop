import React ,{ useState }from 'react'
import { View,Text,FlatList,Button,StyleSheet,ActivityIndicator } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import Card from '../../components/UI/Card';

const  CartScreen= props =>{
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const cartItems = useSelector( state => {
        const transformedCartItems = [];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].prodTitle,
                productPrice: state.cart.items[key].prodPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a,b)=>(a.productId > b.productId ? 1 : -1));
    });
    
    const orderHandler= async ()=> {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems,cartTotalAmount));
        setIsLoading(false);
    };

    return(  
    <View style={styles.screen}>
        <Card style={styles.summary}>
            <Text style={styles.summaryText}>
                Total:<Text style={styles.amount}>Rs{Math.round(cartTotalAmount.toFixed(2)*100 / 100)}</Text>
            </Text>
            {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary}/>
                )
                :<Button title='Order Now' onPress={orderHandler} color={Colors.accent} disabled ={cartItems.length === 0}/>
            }
        </Card>
        <FlatList data={cartItems} keyExtractor={item => item.productId}
           renderItem={itemData=> 
                <CartItem quantity={itemData.item.quantity}
                    title={itemData.item.productTitle} amount={itemData.item.sum}
                    onRemove={()=>{
                        dispatch(cartActions.reomveFromCart(itemData.item.productId))
                    }}
                    deletable 
                />}
        />
    </View>);
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen:{
        margin: 20,

    },
    summary:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText:{
        fontFamily: 'open-sans-bold',
        fontSize:18

    },
    amount:{
        color: Colors.primary
    },
});

export default CartScreen;