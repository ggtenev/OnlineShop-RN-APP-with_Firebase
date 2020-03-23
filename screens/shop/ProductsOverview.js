import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Platform,Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/products'



import ProductItem from '../../components/ProductItem'

export default function ProductsOverview({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const products = useSelector(state => state.products.availableProducts)
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      await dispatch(productActions.fetchProducts())
      setIsLoading(false)
    }
    loadProducts()
  },[dispatch])

  if(isLoading){
    return <View style={{flex:1, justifyContent:'center'}}>
      <ActivityIndicator size='large'/>
    </View>
  } 
  if(!products.length){
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontWeight:'bold',fontSize:18}}>No products </Text>
    </View>
  } 

  return (
    <View style={styles.list}>
      <FlatList data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductItem
          title={item.title}
          price={item.price}
          imgURL={item.imgURL}
          toDetails={() => {
            navigation.navigate('Details', {
              id: item.id,
              title: item.title,
            })
          }}
          addToCart={() => { dispatch(cartActions.addToCart(item)) }}
           />
          }
      />
    </View>
  );
}
ProductsOverview.navigationOptions = ({ navigation }) => {

  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="md-menu" size={32} color={Platform.OS === 'android' ? 'white' : '#888'} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="md-cart" size={32} color={Platform.OS === 'android' ? 'white' : '#888'} />
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  list: {
    // alignItems:'center',
    // width:'95%'
  },
  headerRight: {
    marginHorizontal: 15
  }
})
