import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async (dispatch) => {
    const response = await fetch('https://shopapp-rn-dce35.firebaseio.com/orders/u1.json')
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const resData = await response.json()
    const loadedOrders = []
    for (let key in resData) {
      loadedOrders.push(new Order(
        key,
        resData[key].cartItems,
        Number(resData[key].totalAmount),
        resData[key].date,
      )
      )
    }

    dispatch({ type: SET_ORDERS, orders: loadedOrders })
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date().toISOString()
    const response = await fetch('https://shopapp-rn-dce35.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date
      })
    })
    const resData = await response.json()

    dispatch({ type: ADD_ORDER, orderData: { id: resData.name, cartItems, totalAmount, date } })
  }

}