import {ADD_ORDER} from '../actions/order'
import Order from '../../models/order'


const initState = {
  orders:[]
}

export default (state=initState, action) =>{
  switch(action.type){
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.cartItems,
        action.orderData.totalAmount,
        new Date()
      )
      return {
        ...state,
        orders:[...state.orders,newOrder]
      }
  }

  return state
}

