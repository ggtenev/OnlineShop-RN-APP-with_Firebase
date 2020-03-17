import React, {useState, useEffect, useCallback, useReducer} from 'react';
import { View, Text, TextInput, ScrollView,StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import * as editActions from '../../store/actions/products'

const formReducer = (state, action) => {
  if(action.type === 'UPDATE'){

  }
}

export default function EditProduct({ navigation }) {
  const prodID = navigation.getParam('pid')
  const editedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodID))
  const dispatch = useDispatch()

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  const [validTitle, setValidTitle] = useState(false)
  const [imageURL,setImageURL] = useState(editedProduct ? editedProduct.imgURL : '')
  const [price,setPrice] = useState(editedProduct ? editedProduct.price : '')
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

  const submitForm = useCallback(() => {
    if(!validTitle){
      Alert.alert('Wrong input', 'Please check the errors in the form',[{text:'OK'}])
      return 
    }
   if ( editedProduct){
    dispatch(editActions.updateProduct(title,imageURL,price,description,prodID))
    navigation.goBack()
   } else{
     dispatch(editActions.createProduct(title,imageURL,price,description))
     navigation.goBack()
   }
  },[dispatch,prodID,title,description,imageURL,price,validTitle])
  useEffect(() => {
    navigation.setParams({submit:submitForm})
  },[submitForm])

  const titleChangeHandler =  text => {
    if(text.trim().length === 0){
      setValidTitle(false)
    } else{
      setValidTitle(true)
      setTitle(text)
    }
    
  }



  return (
    <ScrollView style={styles.screen}>
      <View style={styles.form}>
        <View>
          <Text style={styles.title}>Title</Text>
          <TextInput style={styles.input} value={title}
          onChangeText={titleChangeHandler} 
          />
        </View>
        <View>
          <Text style={styles.title}>Image URL</Text>
          <TextInput style={styles.input} value={imageURL}
           onChangeText={text => setImageURL(text)}/>
        </View>
        <View>
          <Text style={styles.title}>Price</Text>
          <TextInput style={styles.input} value={price.toString()}
          onChangeText={text => setPrice(text)}
          keyboardType='decimal-pad'/>
        </View>
        <View>
          <Text style={styles.title}>Description</Text>
          <TextInput style={styles.input} value={description}
          onChangeText={text => setDescription(text)}/>
        </View>
      </View>
    </ScrollView>
  );
}


EditProduct.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('pid') ? 'Edit Product' : 'Add Product'
  const submitForm = navigation.getParam('submit')

  return {
    title: title,
    headerRight: () => (
      <TouchableOpacity style={styles.headerRight} onPress={submitForm}>
        <Ionicons name="md-checkmark" size={30} color={Platform.OS === 'android' ? 'white' : '#888'} />
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  form:{
    margin:20
  },
  formControl:{
    width:'100%'
  },
  input :{
    padding:5,
    borderBottomColor:'grey',
    borderBottomWidth:1,
    marginVertical:4
  },
  title:{
    fontFamily:'open-sans-bold',
    fontSize:18
  },
  headerRight:{marginHorizontal:15}
 })