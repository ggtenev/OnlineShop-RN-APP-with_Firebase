import React,{ useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'


import Navigator from './navigation/Navigator'

import productReducer from './store/recucers/index'
import cartReducer from './store/recucers/cart'
import orderReducer from './store/recucers/order'
import authReducer from './store/recucers/auth'

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  orders:orderReducer,
  auth:authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}/>
  }
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
