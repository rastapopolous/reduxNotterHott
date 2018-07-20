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

export function currentDisplay (state = [], action) {
  switch (action.type) {
    case 'CURRENT_DISPLAY':
      return action.currentDisplay
    default:
      return state
  }
}

export function currDispIndex (state = [], action) {
  switch (action.type) {
    case 'ARR_INDEX':
    return action.arrPosition
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
