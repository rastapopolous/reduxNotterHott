import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RateMe from './RateMe'
import ButtonPanel from './ButtonPanel'
import { getUserData, filterUsers, renderType } from '../actions/actionThings'

class RateMeContainer extends Component {
  constructor () {
    super()

    this.getHottie = this.getHottie.bind(this)
    this.routeProfile = this.routeProfile.bind(this)
    this.filterUsers = this.filterUsers.bind(this)
  }
  //api call to populate user data
  componentDidMount () {
    this.props.getUserData()

  }

  //reduces userbase down by score&gender to single hottest user
  getHottie (type, usercell) {
    let fullGroup = this.props.allUsers
    let hottest = []

    if (type === 'P') {
      this.props.renderType('P')
      this.routeProfile(usercell)
    }

    if (type !== 'all') {
      const sifted = fullGroup.filter(user => user.gender == type)
      fullGroup = sifted
    }
    hottest = fullGroup.reduce((mostHot, user) => {
      return mostHot.score > user.score ? mostHot : user
    })

    let typeSymbol = 'B'
    if (type === 'male') {
      typeSymbol = 'M'
    }
    if (typeSymbol === 'female') {
      typeSymbol = 'F'
    }

    this.props.renderType(typeSymbol)
    this.routeProfile (hottest.cell)
  }
  //route user type to profile display route
  routeProfile (userCell) {
    const profileId = userCell
    this.context.router.push({
      pathname: `/hottest/${profileId}`
    })
  }

  //filter userbase by gender or all users
  filterUsers (type) {
    const fullGroup = this.props.allUsers
    const sifted = fullGroup.filter(user => user.gender == type)
    type === 'all'
    //dispatch state subsetUsers to store (same action as previous?)
    ? this.props.sendFilterUsers(fullGroup)
    : this.props.sendFilterUsers(sifted)
  }

  render () {
    return (
      <div>
        <div className='rateMe-howTo'>
          <div className='howTo-intro'>
            <span>HOW TO:</span>
          </div>
          <div className='howTo-text'>
            <p>1. Decide which girl or guy below is HOT or NOT</p>
            <p>3. Click on the hotter one. They get a point and you get to rate another pic</p>
          </div>
        </div>
        <div className='routeContainer'>
          <div className='rateMe-componentContainer'>
            <div>
              <ButtonPanel
                filterClick={this.filterUsers}
                hottieClick={this.getHottie} />
            </div>
            <div className='rateMe-innerComponent'>
              <RateMe
                userInfo={this.props.subsetUsers}
                profileLink={this.getHottie} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.allUsers,
        subsetUsers: state.filtUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserData()),
        sendfilterUsers: (filtUsers) => dispatch(filterUsers(filtUsers)),
        renderType: (typeSymbol) => dispatch(renderType(typeSymbol))
    }
}

RateMeContainer.contextTypes = {
  router: React.PropTypes.object
}

RateMeContainer.propTypes = {
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
    })
  ),
  getUserData: PropTypes.func,
  sendFilterUsers: PropTypes.func,
  subsetUsers: PropTypes.arrayOf(
    PropTypes.shape({
    })
  ),
  renderType: PropTypes.func
}

RateMeContainer.defaultProps = {
  allUsers: [],
  getUserData: (() => {}),
  sendFilterUsers: (() => {}),
  subsetUsers: [],
  renderType: (() => {})
}

export default connect(mapStateToProps, mapDispatchToProps)(RateMeContainer)
