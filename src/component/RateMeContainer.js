import React, { Component } from 'react'
import RateMe from './RateMe'
import userData from '../data/userData'

export default class RateMeContainer extends Component {
  constructor () {
    super()

    this.state = {
    allUsers: userData,
    filteredUsers: userData
    }

    this.filterUsers = this.filterUsers.bind(this)
    this.getHottie = this.getHottie.bind(this)
    this.routeProfile = this.routeProfile.bind(this)
  }

  getHottie (type) {
    let fullGroup = this.state.allUsers
    let hottest = []
    if (type !== 'all') {
      const sifted = fullGroup.filter(user => user.gender == type)
      fullGroup = sifted
    }
    hottest = fullGroup.reduce((mostHot, user) => {
      return mostHot.score > user.score ? mostHot : user
    })

    //var variable = conditionA ? valueA : (conditionB ? valueB: (conditionC ? valueC : valueD));
    /*
    type === 'male' ? typeSymbol = 'M' :
      (type === 'female' ? typeSymbol = 'F' : typeSymbol = '')
    */
    let typeSymbol = 'B'
    if (type === 'male') {
      typeSymbol = 'M'
    }
    if (type === 'female') {
      typeSymbol = 'F'
    }
    const fullId = hottest.cell.concat(typeSymbol)
    console.log('HottestCell: '+fullId)
    this.context.router.push({
      pathname: `/hottest/${fullId}`
    })
  }

  routeProfile (userCell, typeSymbol) {
    const profileId = userCell.concat(typeSymbol)
    this.context.router.push({
      pathname: `/hottest/${profileId}`
    })
  }

  filterUsers (type) {
    const fullGroup = this.state.allUsers
    if (type === 'all') {
      this.setState({ filteredUsers: fullGroup }, () =>
      console.log('filteredUSERS-ALL: '+this.state.filteredUsers))
    }
    else {
      const sifted = fullGroup.filter(user => user.gender == type)
      this.setState({ filteredUsers: sifted }, () =>
      console.log('filteredUSERS-SOME: '+this.state.filteredUsers))
    }
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
