import getUser from '../api/Users'

export function getUserData () {
  return (dispatch) => {
    getUser()
      .then(results => {
        dispatch(fetchedUsers(results.data))
      })
      .catch(new Error('failed'))
  }
}

export function fetchedUsers (allUsers) {
  return {
    type: 'ALL_USERS',
    allUsers
  }
}

export function filterUsers (filtUsers) {
  return {
    type: 'FILTERED_USERS',
    filtUsers
  }
}

export function renderType (typeSymbol) {
  return {
    type: 'RENDER_TYPE',
    typeSymbol
  }
}
