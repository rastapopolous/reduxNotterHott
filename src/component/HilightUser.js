import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class HilightUser extends Component {
  constructor () {
    super()

    this.state = {
      featuredUser: []
    }

    this.renderRelevantHeader = this.renderRelevantHeader.bind(this)
  }

  componentWillMount () {
    const userCell = this.props.params.profileId
    const fullUserGroup = this.props.everyUser
    const hottie = fullUserGroup.filter(user => user.cell == userCell)
    this.setState({ featuredUser: hottie})
  }
  
  renderRelevantHeader () {
    const woman = 'THE HOTTEST HOTT WOMAN!!!'
    const man = 'THE HOTTEST HOTT GUY!!!'
    const both = 'THE HOTTEST HOTTEST HOTT!!!'
    const profile = 'Find out more about me:)'
    const thisType = this.props.thisType

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

const mapStateToProps = (state) => {
  return {
    everyUser: state.allUsers,
    thisType: state.typeSymbol

  }
}

HilightUser.propTypes = {
  params: React.PropTypes.shape({
    profileId: React.PropTypes.string
  }),
  everyUser: PropTypes.arrayOf(
    PropTypes.shape({
    })
  ),
  thisType: PropTypes.arr
}

HilightUser.defaultProps = {
  params: {
    profileId: ''
  },
  everyUser: {},
  thisType: []
}

export default connect(mapStateToProps)(HilightUser)
