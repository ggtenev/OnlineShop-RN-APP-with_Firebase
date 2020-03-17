import PRODUCTS from '../../data/dummy-data'
import { DELETE_ITEM, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products'
import Product from '../../models/product'


const initState = {
  availableProducts:[],
  userProducts:[]
  .filter(p => p.owner === 'u1')
}

export default (state=initState,action) => {
  switch(action.type){
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts:action.products,
        userProducts:action.products,
      }
    case CREATE_PRODUCT:
      const product = new Product(
      action.product.id,
      'u1',
      action.product.title,
      action.product.imgURL,
      action.product.description,
      Number(action.product.price)
      )
      const updatedProducts = [...state.userProducts,product]
        return{
          ...state,
          userProducts:updatedProducts,
          availableProducts:updatedProducts
        }
    case UPDATE_PRODUCT: 
      const prodIndex = state.userProducts.findIndex(p => p.id === action.product.id)
      const updatedProduct = new Product(
        action.product.id,
        state.userProducts[prodIndex].owner,
        action.product.title,
        action.product.imgURL,
        action.product.description,
        state.userProducts[prodIndex].price
      )
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[prodIndex] = updatedProduct

      const availableProdIndex = state.availableProducts.findIndex(p => p.id === action.product.id)
      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProdIndex] = updatedProduct
      return {
        ...state,
        userProducts:updatedUserProducts,
        availableProducts:updatedAvailableProducts
      }
    case DELETE_ITEM:
      return {
        ...state,
        userProducts:state.userProducts.filter(p => p.id !== action.pid),
        availableProducts:state.availableProducts.filter(p => p.id !== action.pid)
      }
  }
  return state
}