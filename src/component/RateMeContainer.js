import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RateMe from './RateMe'
import ButtonPanel from './ButtonPanel'
import { getUserData, filterUsers, renderType } from '../actions/actionThings'
import userData from '../data/userData'


class RateMeContainer extends Component {
  constructor () {
    super()

    this.getHottie = this.getHottie.bind(this)
    this.routeProfile = this.routeProfile.bind(this)
    this.filterUsers = this.filterUsers.bind(this)
  }

  componentDidMount () {
    this.props.fetchUsers()
  }

  getHottie (type) {
    console.log(this.props.allUsers)
    let fullGroup = this.props.allUsers
    let hottest = []

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
    //dispatch typeSymbol
    this.props.renderType(typeSymbol)
    this.routeProfile (hottest.cell)
  }

  routeProfile (userCell) {
    //retrieve typeSymbol
    const profileId = userCell
    this.context.router.push({
      pathname: `/hottest/${profileId}`
    })
  }

  filterUsers (type) {
    const fullGroup = this.props.allUsers
    const sifted = fullGroup.filter(user => user.gender == type)
    type === 'all'
    //dispatch state filteredUsers to store (same action as previous?)
    ? this.props.filterUsers(fullGroup)
    : this.props.filterUsers(sifted), () =>
        console.log('filteredUSERS-SOME: '+this.props.filteredUsers)
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
                filterLink={this.filterUsers}
                HottieLink={this.getHottie} />
            </div>
            <div className='rateMe-innerComponent'>
              <RateMe
                userInfo={this.props.filteredUsers}
                profileLink={this.routeProfile} />
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
        filteredUsers: state.filtUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(getUserData()),
        filterUsers: (filtUsers) => dispatch(filterUsers(filtUsers)),
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
  fetchUsers: PropTypes.func,
  filterUsers: PropTypes.func,
  filteredUsers: PropTypes.arrayOf(
    PropTypes.shape({
    })
  )
}

RateMeContainer.defaultProps = {
  allUsers: {},
  fetchUsers: (() => {}),
  filterUsers: (() => {}),
  filteredUsers: []
}

export default connect(mapStateToProps, mapDispatchToProps)(RateMeContainer)
