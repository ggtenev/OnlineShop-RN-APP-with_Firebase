import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import CartItem from './CartItem'
import Colors from '../constants/Colors'

export default function OrderItem({ total, date, item,quantity,title }) {

  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.card}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${total.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button 
      title={showDetails ? 'Hide Details':'Show details'} 
      color={Colors.primary} 
      onPress={() => setShowDetails(prev => !prev)}/>
      {showDetails && <View>
       {item.map(i => <CartItem key = {Math.random()} 
       quantity= {i.quantity} total={i.sum} price = {i.price} title={i.title}/>)}
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding:15,
    alignItems:'center'
  },
  summary:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    margin:5
  },
  amount:{
    fontFamily:'open-sans-bold'
  },
  date:{
    fontSize:16,

  }
})