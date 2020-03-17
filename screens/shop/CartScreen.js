import React from 'react';
import { View, FlatList, StyleSheet, Text, Button } from 'react-native';
import  Colors  from '../../constants/Colors'
import {useSelector, useDispatch} from 'react-redux'
import CartItem from '../../components/CartItem'
import { addOrder } from '../../store/actions/order'

import * as actions from '../../store/actions/cart'

export default function CartScreen() {
  const total = useSelector(state => state.cart.totalSum)
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const arrayCartItems = []
  for(let key in cartItems){
    arrayCartItems.push({
      id:key,
      title:cartItems[key].title,
      price:cartItems[key].price,
      sum:cartItems[key].sum,
      quantity:cartItems[key].quantity,
    })
  }
  arrayCartItems.sort(function(a, b) {
    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total:
          <Text style={styles.amount}>${Math.round(total.toFixed(2)) * 100 / 100}</Text>
        </Text>
        <Button 
        title='Order now' 
        color={Colors.accent} 
        disabled = {total === 0}
        onPress={() => dispatch(addOrder(arrayCartItems,total))}
        />
      </View>
      <FlatList 
      data={arrayCartItems}
      renderItem={({item}) => <CartItem 
      deletable={true}
      price={item.price} 
      quantity={item.quantity} 
      title={item.title}
      deleteItem = {() => dispatch(actions.removeFromCart(item.id))}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    borderRadius:5
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginLeft:5
  }
})
