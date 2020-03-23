export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDacLmVZxVvMXtH_HJetVvBLnR_DW8W2eU', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    })
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
    const resData = await response.json()
    console.log(resData)
    dispatch({ type: SIGN_UP,token:resData.idToken, userId:resData.localId })
  }
}
export const signIn = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDacLmVZxVvMXtH_HJetVvBLnR_DW8W2eU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })
      if (!response.ok) {
        const errorData = await response.json()
        let errorId = errorData.error.message
        let message = ''
        if(errorId === 'EMAIL_NOT_FOUND'){
          message = 'Check if your email is correct'
        } else if(errorId === 'INVALID_PASSWORD'){
          message = 'Check if your ppassword is correct'
        }
        throw new Error(message)
      }
      const resData = await response.json()
      console.log(resData)

    dispatch({ type: SIGN_IN, token:resData.idToken, userId:resData.localId})
  }
}