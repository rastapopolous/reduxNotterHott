export function allUsers (state = [], action) {
  switch (action.type) {
    case 'ALL_USERS':
      return action.allUsers
    default:
      return state
  }
}

export function filteredUsers (state = [], action) {
  switch (action.type) {
    case 'FILTERED_USERS':
      return action.filtUsers
    default:
      return state
  }
}

export function renderType (state = '', action) {
  switch (action.type) {
    case 'RENDER_TYPE':
      return action.typeSymbol
    default:
      return state
  }
}
