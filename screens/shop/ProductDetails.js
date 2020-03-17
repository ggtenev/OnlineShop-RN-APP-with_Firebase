import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, Platform } from 'react-native';
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetails({ navigation }) {

  const dispatch = useDispatch()
  const id = navigation.getParam('id')
  const product = useSelector(state => state.products.availableProducts.find(p => p.id === id))
  return (
    <ScrollView>
      <Image source={{ uri: product.imgURL }} style={styles.img}/>
      <View style={styles.buttonContainer}>
      <Button 
      title='Add To Cart' 
      color={Colors.primary} 
      onPress={() => dispatch(cartActions.addToCart(product))}/>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}
ProductDetails.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('title'),
    headerRight:() => (
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('Cart')}>
         <Ionicons name="md-cart" size={32} color={Platform.OS ==='android' ? 'white':'#888'} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  img:{
    width:'100%',
    height:300
  },
  price:{
    fontSize:20,
    color:'#888',
    textAlign:'center',
    marginVertical:10
  },
  description:{
    fontSize:14,
    textAlign:'center',
    marginHorizontal:20
  },
  buttonContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:5
  },
  headerRight:{
    marginHorizontal:15
  }
})
