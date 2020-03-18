import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import * as orderActions from '../../store/actions/order'

import OrderItem from '../../components/OrderItem'

export default function OrderScreen() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderActions.fetchOrders())
  }, [dispatch])
  const orders = useSelector(state => state.orders.orders)
  console.log(orders)

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderItem
          total={item.total}
          date={(item.readDate)}
          item={item.items}
        />}
      />
    </View>
  );
}

OrderScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <TouchableOpacity style={styles.headerRight} onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="md-menu" size={32} color={Platform.OS === 'android' ? 'white' : '#888'} />
      </TouchableOpacity>
    ),
  }
}


const styles = StyleSheet.create({
  headerRight: {
    marginHorizontal: 15
  }
})

