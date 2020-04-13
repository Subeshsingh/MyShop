import React,{useState} from 'react';
import { View,Text,StyleSheet,Button } from 'react-native'
import CartItem from './CartItem'
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = props =>{
    const [showDetails, setshowDetails] = useState(false)

 return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Rs.{props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={()=>{setshowDetails(prevState => !prevState)}}/>
            { showDetails ? 
                      (<View style={styles.itemDetails}>
                            {console.log(props.items)}
                            {props.items.map(cartItem =><CartItem key={cartItem.productId}  title={cartItem.productTitle} 
                                                quantity={cartItem.quantity} amount={cartItem.sum}/>)}  
                        </View>)
                       : null
            }
        </Card>
 );
}   

const styles=StyleSheet.create({
    orderItem:{
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
    },
    itemDetails:{
        width: '100%'
    }
});
export default OrderItem;