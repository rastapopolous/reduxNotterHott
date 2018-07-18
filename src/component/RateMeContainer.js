import React, { Component } from 'react'
import RateMe from './RateMe'
import { connect } from 'react-redux'
import { getUserData, filteredUsers, renderType } from '../actions/actionThings'

import userData from '../data/userData'

import  getUsers from  '../api/Users'

export default class RateMeContainer extends Component {
  constructor () {
    super()

    this.state = {
      allUsers: userData,
      filteredUsers: userData,
      tempUsers: []
    }

    this.filterUsers = this.filterUsers.bind(this)
    this.getHottie = this.getHottie.bind(this)
    this.routeProfile = this.routeProfile.bind(this)
  }

  componentDidMount () {

    getUsers().then(results => {
//dispatch state for api results to store
      this.setState({ tempUsers: results.data.results})
    })
  }

  getHottie (type) {
    console.log(this.state.tempUsers)
    let fullGroup = this.state.allUsers
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
    if (type === 'female') {
      typeSymbol = 'F'
    }
    //dispatch typeSymbol
    const theseUsers = this.state.tempUsers
    theseUsers.forEach(user => console.log(user.cell))
    this.routeProfile (hottest.cell, typeSymbol)
  }

  routeProfile (userCell, typeSymbol) {
    //retrieve typeSymbol
    const profileId = userCell.concat(typeSymbol)
    this.context.router.push({
      pathname: `/hottest/${profileId}`
    })
  }

  filterUsers (type) {
    const fullGroup = this.state.allUsers
    const sifted = fullGroup.filter(user => user.gender == type)
    type === 'all'
    //dispatch state filteredUsers to store (same action as previous?)
    ? this.setState({ filteredUsers: fullGroup }, () =>
        console.log('filteredUSERS-ALL: '+this.state.filteredUsers))
    : this.setState({ filteredUsers: sifted }, () =>
        console.log('filteredUSERS-SOME: '+this.state.filteredUsers))
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
            <div className='button-container'>
              <div className='buttonCont-left'>
                <p className='buttonCont-title'>Show me:</p>
                <p className='buttonCont-title'>Whos Hottest?</p>
              </div>
              <div className='buttonCont-right'>
                <div className='buttonCont-topHalf'>
                  <button
                    type='button'
                    className='filter-buttons pure-button pure-button-active'
                    onClick={() => this.filterUsers('all')}>
                    Women&Men
                  </button>
                  <button
                    type='button'
                    className='filter-buttons pure-button pure-button-active'
                    onClick={() => this.filterUsers('female')}>
                    Women Only
                  </button>
                  <button
                    type='button'
                    className='filter-buttons pure-button pure-button-active'
                    onClick={() => this.filterUsers('male')}>
                    Men Only
                  </button>
                </div>
                <div className='buttonCont-bottomHalf'>
                  <button
                    type='button'
                    className='filter-buttons pure-button pure-button-active'
                    onClick={() => this.getHottie('male')}>
                    Hottest Guy
                  </button>
                  <button
                    type='button'
                    className='filter-buttons pure-button pure-button-active'
                    onClick={() => this.getHottie('female')}>
                    Hottest Woman
                  </button>
                  <button
                    type='button'
                    className='filter-buttons pure-button pure-button-active'
                    onClick={() => this.getHottie('all')}>
                    MOSTHOT
                  </button>
                </div>
              </div>
            </div>
            <div className='rateMe-innerComponent'>
              <RateMe
                userInfo={this.state.filteredUsers}
                profileLink={this.routeProfile} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RateMeContainer.contextTypes = {
router: React.PropTypes.object
}
