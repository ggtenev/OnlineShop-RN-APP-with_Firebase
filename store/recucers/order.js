import {ADD_ORDER, SET_ORDERS} from '../actions/order'
import Order from '../../models/order'


const initState = {
  orders:[]
}

export default (state=initState, action) =>{
  switch(action.type){
    case SET_ORDERS:
      return {
        orders:action.orders
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.id,
        action.orderData.cartItems,
        action.orderData.totalAmount,
        action.date
      )
      return {
        ...state,
        orders:[...state.orders,newOrder]
      }
  }

  return state
}

