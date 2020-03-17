import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, Button,TouchableOpacity, TouchableNativeFeedback,Platform } from 'react-native';
import Colors from '../constants/Colors'

export default function MyProductItem({ imgURL, title, price,toDetails, deleteItem, editItem }) {
  let TouchableCmp = TouchableOpacity

  if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableCmp = TouchableNativeFeedback
  }
  return (
    <TouchableCmp onPress={toDetails}>
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: imgURL }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text> 
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title='Edit' onPress={editItem} color={Colors.primary} />
        <Button title='Delete' onPress={deleteItem} color={Colors.primary} />
      </View>
    </View>
    </TouchableCmp>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    borderRadius: 10
  },
  img: {
    width: '100%',
    height: '100%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20

  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  details: {
    alignItems: 'center'
  },
  imgContainer:{
    width:'100%',
    height:'60%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden'
  }
})
