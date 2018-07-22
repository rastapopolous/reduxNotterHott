import getUser from '../api/Users'

export function getUserData () {
  return (dispatch) => {
    getUser()
      .then(results => {
        dispatch(fetchedUsers(results.data))
        dispatch(sendFilterUsers(results.data))
      })
      .catch(err => console.warn(`ERROR: ${err.message}`))
  }
}

export function fetchedUsers (allUsers) {
  return {
    type: 'ALL_USERS',
    allUsers
  }
}

export function sendFilterUsers (filtUsers) {
  return {
    type: 'FILTERED_USERS',
    filtUsers
  }
}

export function currentDisplay (currDisp) {
  return {
    type: 'CURRENT_DISPLAY',
    currDisp
  }
}

export function arrIndex (arrPosition) {
  return {
    type: 'ARR_INDEX',
    arrPosition
  }
}

export function renderType (typeSymbol) {
  return {
    type: 'RENDER_TYPE',
    typeSymbol
  }
}
