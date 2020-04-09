import React,{useState} from 'react';
import { View,Text,StyleSheet,Button } from 'react-native'
import CartItem from'./CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props =>{
    const [showDetails, setshowDetails] = useState(false)

 return (<View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Rs.{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title="Show Details" onPress={()=>{setshowDetails(prevState => !prevState)}}/>
            {showDetails && (
                        <View>
                            {props.items.map(cartItem =><CartItem  key={cartItem.productId} title={cartItem.productTitle} 
                                                    quantity={cartItem.quantity} amount={cartItem.sum}/>)}  
                        </View>)
            }
        </View>
 );
}   

const styles=StyleSheet.create({
    orderItem:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        alignItems:'center',
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '100%',
        marginBottom: 20
    },
    totalAmount:{
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date:{
        fontSize: 16,
        fontFamily: 'open-sans',
        color:'#888'
    }
});
export default OrderItem;