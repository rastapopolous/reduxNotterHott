import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserCard from './UserCard'

//component handles population of usercards, removes card on selection
//replaces with updated card
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
    this.setState({ currentDisplay: newDisplayed, arrIndex }, () => {
      this.fillCurrentDisplay()
    })
  }

  //iteratively re-populates user display with one or two users
  //from this.state.allUsers
  fillCurrentDisplay () {
    const userGroup = this.state.allUsers
    const current = this.state.currentDisplay
    //dedupes existing card in current display to ensure a different one is chosen
    function noDupe (userId) {
      const noDupes = userGroup.filter(user => user.cell != userId)
      const howMany = noDupes.length
      const userRand = Math.floor(Math.random() * howMany)
      const makeUser = noDupes[userRand]
      return makeUser
    }
    //iteratively fills current display, pushing or unshifting depending
    //on existing card place in array (to ensure cards dont jump between loads)
    for (let i = current.length; i < 2; i++) {
      if (current.length === 0) {
        const userNum = Math.floor(Math.random() * 100)
        const zeroUser = userGroup[userNum]
        current.push(zeroUser)
      } else if (current.length === 1) {
          const firstElId = current[0].cell
          const thisIndex = this.state.arrIndex
          if (thisIndex === 1) {
            current.unshift(noDupe(firstElId))
            this.setState({ currentDisplay: current, arrIndex: null })
          } else {
            current.push(noDupe(firstElId))
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
                getHottie={this.props.profileLink}
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
