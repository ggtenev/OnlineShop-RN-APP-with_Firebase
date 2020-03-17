import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CartItem({ price, title, quantity, deleteItem, deletable }) {
  return (
    <View style={styles.cart}>
      <View style={styles.info}>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightItems}>
        <Text style={styles.title}>Total:${price * quantity}</Text>
       {deletable && <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
          <Ionicons name="md-trash" size={28} color={Platform.OS === 'android' ? 'red' : '#888'} />
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cart:{
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    alignItems:'center',
    // borderWidth:1,
    // borderColor:'grey',
    marginVertical:5,
    borderRadius:5
  },
  info:{
    flexDirection:'row',
    alignItems:'center'
  },
  quantity:{
    fontFamily:'open-sans',
    color:'black',
    fontSize:19,
    marginHorizontal:5
  },
  title:{
    fontFamily:'open-sans-bold',
    fontSize:16
  },
  deleteButton:{
    marginHorizontal:20
  },
  rightItems:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:20
  }


})
{/* <Ionicons name="md-cart" size={32} color={Platform.OS ==='android' ? 'white':'#888'} /> */ }