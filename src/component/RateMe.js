import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserCard from './UserCard'
import { connect } from 'react-redux'
import { filteredUsers, currentDisplay } from '../actions/actionThings'

export default class RateMe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      //***this was  actually passed as filterUsers state from container
      allUsers: this.props.userInfo,
      currentDisplay: [],
      arrIndex: null
    }

    this.fillCurrentDisplay = this.fillCurrentDisplay.bind(this)
    this.userRemove = this.userRemove.bind(this)
  }

  //calls on mount to fill display of two userCards
  componentWillMount () {
    this.fillCurrentDisplay()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.userInfo !== nextProps.userInfo) {
//dispatch state to store
// this will dispatch to filteredUsers
      this.setState({ allUsers: nextProps.userInfo, currentDisplay: [] }, () => {
        this.fillCurrentDisplay()
      })
    }
  }

  //Onclick in UserCard component, id is passed into UserRemove,
  //non-chosen usercard is filtered/removed.
  //chosen card preserved in this.state.currentDisplay
  userRemove (id) {
    let arrIndex = ''
    const displayed = this.state.currentDisplay
    displayed.forEach(element => {

       if (element.cell === id) {
  //preserves index position in array (1st 2nd) of clicked card
         arrIndex = displayed.indexOf(element)
       }
    })
    const newDisplayed = displayed.filter(user => user.cell == id)
//dispatch state to store
    this.setState({ currentDisplay: newDisplayed, arrIndex }, () => {
      this.fillCurrentDisplay()
    })
  }

  //populates user display with one or two users from this.state.allUsers
  fillCurrentDisplay () {
    const userGroup = this.state.allUsers
    const current = this.state.currentDisplay
  //Must not duplicate 1st element of current displayed
  //current display elOne is filtered from userGroup before rand selection
  //of second el for current
    function noDupe (userId) {
      const noDupes = userGroup.filter(user => user.cell != userId)
      const howMany = noDupes.length
      console.log(noDupes)
      const userRand = Math.floor(Math.random() * howMany)
      console.log(userRand)
      const makeUser = noDupes[userRand]
      return makeUser
    }

    for (let i = current.length; i < 2; i++) {
      if (current.length === 0) {
        const userNum = Math.floor(Math.random() * 20)
        const zeroUser = userGroup[userNum]
        current.push(zeroUser)
      } else if (current.length === 1) {
          const firstElId = current[0].cell
          const thisIndex = this.state.arrIndex
          if (thisIndex === 1) {
            current.unshift(noDupe(firstElId))
//dispatch state to store
            this.setState({ currentDisplay: current, arrIndex: null })
          } else {
            current.push(noDupe(firstElId))
//dispatch state to store
            this.setState({ currentDisplay: current })
          }
      }
    }
  }

  render () {
    return (
      <div>
        <div className='card-container'>
          {this.state.currentDisplay.map(user => {
            return (
              <UserCard
                onHandleClick={this.userRemove}
                routeProfile={this.props.profileLink}
                key={user.cell}
                user={user} />
            )
          })}
        </div>
      </div>
    )
  }
}

RateMe.propTypes = {
  userInfo: PropTypes.arrayOf(
    PropTypes.shape({
      cell: PropTypes.string,
      picture: PropTypes.object
    })
  ),
  profileLink: PropTypes.func
}

RateMe.defaultProps = {
  userInfo: {
    cell: '',
    picture: ''
  },
  profileLink: (() => {})
}
