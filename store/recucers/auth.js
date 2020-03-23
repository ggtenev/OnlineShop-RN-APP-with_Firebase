import { SIGN_IN, SIGN_UP } from "../actions/auth"

const initState = {
  token: null,
  userId: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        token: action.token,
        userId: action.userId
      }
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId
      }
      
  }
  return state
}