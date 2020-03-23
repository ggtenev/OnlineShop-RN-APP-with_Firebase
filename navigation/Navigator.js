
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation'
import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native'
import Colors from '../constants/Colors'

import ProductsOverview from '../screens/shop/ProductsOverview'
import ProductDetails from '../screens/shop/ProductDetails'
import CartScreen from '../screens/shop/CartScreen'
import OrderScreen from '../screens/shop/OrderScreen'
import UserProducts from '../screens/user/UserProducts'
import EditProduct from '../screens/user/EditProduct'
import AuthScreen from '../screens/user/AuthScreen'

defaultOptions = {
  headerTitleAlign: 'center',
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  }
}



const Orders = createStackNavigator({
  Orders: OrderScreen
}, {
  defaultNavigationOptions: defaultOptions
}
)

const AdminNavigator = createStackNavigator({
  Admin: UserProducts,
  EditProduct:EditProduct,
}, {
  defaultNavigationOptions: defaultOptions
}
)

const StackNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverview,
  },
  Details: {
    screen: ProductDetails,
  },
  Cart: {
    screen: CartScreen,
  },
},
  {
    defaultNavigationOptions: defaultOptions,
  });

const MyDrawerNavigator = createDrawerNavigator({
  Shop: {
    screen: StackNavigator,
  },
  Orders: {
    screen: Orders,
  },
  Admin: {
    screen: AdminNavigator
  }
});

// const AuthNavigator = createStackNavigator({
//   Auth:AuthScreen
// },{
//   defaultNavigationOptions: defaultOptions,
// })

const MainNavigator = createSwitchNavigator({
  Auth:AuthScreen,
  Shop:MyDrawerNavigator
})

export default createAppContainer(MainNavigator);