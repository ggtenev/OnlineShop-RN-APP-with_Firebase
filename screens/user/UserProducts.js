import React  from 'react';
import { View, FlatList, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import  MyProductItem from '../../components/MyProductItem'
import { Ionicons } from '@expo/vector-icons';
import * as productActions from '../../store/actions/products'


export default function userProducts({navigation}) {
  const products = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()

  const deleteHandler = (id) => {
    Alert.alert('Warning!','Are you sure you want to delete this item?', [
      {text:'No',style:'default'},
      {text:'Yes',style:'destructive', onPress:() => {
        // dispatch(productActions.deleteProduct(id))
        console.log('pressed')
      }}
    ])
  }

  return (
    <FlatList 
    data = {products}
    renderItem={({item}) => {
      return <MyProductItem imgURL={item.imgURL} 
      title={item.title} 
      price={item.price}
      deleteItem={() => {dispatch(productActions.deleteProduct(item.id))}}
      editItem={() => navigation.navigate('EditProduct', {pid:item.id,title:item.title})}/>
    }}
    />
  );
}

userProducts.navigationOptions = ({navigation}) => {
  return {
    title:'My Products',
    headerLeft: () => (
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="md-menu" size={32} color={Platform.OS === 'android' ? 'white' : '#888'} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('EditProduct')}>
        <Ionicons name="md-create" size={30} color={Platform.OS === 'android' ? 'white' : '#888'} />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  headerRight: {
    marginHorizontal: 15
  }
})
