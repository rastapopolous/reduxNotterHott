import React, { Component } from 'react'
import PropTypes from 'prop-types'
import userData from '../data/userData'


export default class HilightUser extends Component {
  constructor () {
    super()

    this.state = {
      featuredUser: [],
      renderType: []
    }

    this.renderRelevantHeader = this.renderRelevantHeader.bind(this)
  }

componentWillMount () {
    const userInfo = this.props.params.fullId
    const fullIdToArr = userInfo.split('')
    const renderType = fullIdToArr.pop()
    const userCell = fullIdToArr.join('')
    const hottie = userData.filter(user => user.cell == userCell)
//dispatch state to store
    this.setState({ featuredUser: hottie, renderType }, () =>
        console.log(`THISUSER: ${this.state.featuredUser[0]}`))
}

  renderRelevantHeader () {
    const woman = 'THE HOTTEST HOTT WOMAN!!!'
    const man = 'THE HOTTEST HOTT GUY!!!'
    const both = 'THE HOTTEST HOTTEST HOTT!!!'
    const profile = 'Find out more about me:)'
    const thisType = this.state.renderType

    if (thisType[0] === 'B') {
      return (
        <div className='highlight-titleBox box-green'>
          <span className=''>{both}</span>
        </div>
      )
    } else if (thisType[0] === 'M') {
      return (
        <div className='highlight-titleBox box-pink'>
          <span className=''>{man}</span>
        </div>
      )
    } else if (thisType[0] === 'F') {
      return (
        <div className='highlight-titleBox box-blue'>
          <span className=''>{woman}</span>
        </div>
      )
    } else if (thisType[0] === 'P') {
      return (
        <div className='highlight-titleBox box-yellow'>
          <span className=''>{profile}</span>
        </div>
      )
    }
  }

  render () {
    const user = this.state.featuredUser[0]
    return (
      <div>
        <div className='routeContainer'>
          <div className='hilight-profileContainer'>
            {this.renderRelevantHeader()}
            <div className='hilight-imageAndTextDiv'>
              <div className='hilight-image'>
                <img className='userPic' src={user.picture.large} alt='imgHere' />
              </div>
              <div className='hilight-text'>
                <span><p>{user.name.first} {user.name.last}</p></span>
                <span><p>{user.name.first} {user.name.last}</p></span>
                <span><p>{user.name.first} {user.name.last}</p></span>
                <span><p>{user.name.first} {user.name.last}</p></span>
                <span><p>{user.name.first} {user.name.last}</p></span>
                <span><p>{user.name.first} {user.name.last}</p></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HilightUser.propTypes = {
  params: React.PropTypes.shape({
    fullId: React.PropTypes.string
  })
}

HilightUser.defaultProps = {
  params: {
    fullId: ''
  }
}
