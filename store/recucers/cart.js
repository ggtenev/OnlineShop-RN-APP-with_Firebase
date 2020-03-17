import cart, { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import CartItem from '../../models/cart-item'
import { ADD_ORDER } from '../actions/order'
import { DELETE_ITEM } from '../actions/products'

const initState = {
  items:{},
  totalSum:0
}

export default  (state = initState, action) => {
   switch(action.type){
     case ADD_TO_CART:
       const addedProduct = action.product
       const price = addedProduct.price
       const title = addedProduct.title

       if(state.items[addedProduct.id]){
         //already have the item in the cart
         const updatedItem = new CartItem(
           state.items[addedProduct.id].quantity + 1,
           price,
           title,
           price + state.items[addedProduct.id].sum
         )
          return{
           ...state,
           items:{...state.items,[addedProduct.id]:updatedItem},
           totalSum:state.totalSum + price
          }
       } else{
         let newCartItem = new CartItem(1,price,title,price)
         return {
           ...state,
           items:{...state.items, [addedProduct.id]:newCartItem},
           totalSum:state.totalSum + price
         }
       }
       //qty
       //title
       //peice
       //sum
       case REMOVE_FROM_CART:
         const pid = action.id
         if(state.items[pid].quantity > 1){
          const updatedItem = new CartItem(
            state.items[pid].quantity - 1,
            state.items[pid].price,
            state.items[pid].title,
            state.items[pid].sum - state.items[pid].price
          )
          const updatedCartItems = {...state.items,[pid]:updatedItem}
           return{
             ...state,
             items:updatedCartItems,
             totalSum:state.totalSum - state.items[pid].price
           }

         }else {
           const updatedCartItems = {...state.items}
           delete updatedCartItems[pid]
           return{
             ...state,
             items:updatedCartItems,
             totalSum:state.totalSum - state.items[pid].price
           }
         }
         case ADD_ORDER:
           return initState
         case DELETE_ITEM:
           if(!state.items[action.pid]){
             return state
           }
           const updatedItems = {...state.items}
           const itemTotal = state.items[action.pid].sum
           delete updatedItems[action.pid]
           return {
             ...state,
             items:updatedItems,
             totalSum:state.totalSum - itemTotal
           }

   }
  return state
}