export const DELETE_ITEM = 'DELETE_ITEM'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

import Product from '../../models/product'

export const fetchProducts = () => {
  return async dispatch => {
  const response = await fetch('https://shopapp-rn-dce35.firebaseio.com/products.json')
  const resData = await response.json()
  const loadedProducts = []
  for(let key in resData){
    loadedProducts.push( new Product (
      key,
      'u1',
      resData[key].title,
      resData[key].imgURL,
      resData[key].description,
      Number(resData[key].price),
    ))
  } 
  dispatch({type:SET_PRODUCTS, products:loadedProducts})
  }
}

export const deleteProduct = productID => {
  return {type:DELETE_ITEM,pid:productID}
}

export const createProduct = (title,imgURL,price,description) => {
  return async(dispatch) => {
    //async code
    const response = await fetch('https://shopapp-rn-dce35.firebaseio.com/products.json', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        title,
        imgURL,
        price,
        description
      })
    })

    const resData = await response.json()

    dispatch({ type: CREATE_PRODUCT,product:{
      id:resData.name,
      title,
      imgURL,
      price:Number(price),
      description
    }})
  }
}
export const updateProduct = (title,imgURL,price,description,id) => {
  return { type: UPDATE_PRODUCT,product:{
    title,
    imgURL,
    price,
    description,
    id
  }}
}