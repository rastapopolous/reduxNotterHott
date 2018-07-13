import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderType } from '../actions/actionThings'


const UserCard = ({ onHandleClick, routeProfile, user }) => {
  return (
    <div className='profile-display'>
      {/* need action here to dispatch typeSymbol*/}
      <button type='button' onClick={() => routeProfile(user.cell, 'P')}>
        <div className='profileLink'><span>Check me out on NotterHott!!!</span></div>
      </button>
      <button type='button' className='user-info' onClick={() => onHandleClick(user.cell)}>
        <img className='userPic' src={user.picture.large} alt='UserPic' />
        <div className='text-box'>
          <span className='userName'><p> {user.name.first} {user.name.last}</p></span>
          <span className='cityName'><p>{user.location.city}, {user.nat}</p></span>
          <span className='cityName'><p>{user.cell}</p></span>
        </div>
      </button>
    </div>
  )
}

export default UserCard

UserCard.propTypes = {
  user: PropTypes.shape({
    cell: PropTypes.string,
    dob: PropTypes.string,
    picture: PropTypes.object,
    name: PropTypes.object,
    location: PropTypes.object,
    nat: PropTypes.string,
    newId: PropTypes.number
  }),
  routeProfile: PropTypes.func,
  onHandleClick: PropTypes.func
}

UserCard.defaultProps = {
  user: {
    cell: '',
    dob: PropTypes.string,
    picture: '',
    name: '',
    location: '',
    nat: '',
    newId: ''
  },
  routeProfile: () => {},
  onHandleClick: () => {}
}

{/*
UserCard.propTypes = {
   user: PropTypes.arrayOf(PropTypes.shape({
     cell: PropTypes.string,
     dob: PropTypes.string,
     picture: PropTypes.object,
     name: PropTypes.object,
     location: PropTypes.object,
     nat: PropTypes.string,
     newId: PropTypes.number
   })),
   onHandleClick: PropTypes.func
}
*/}
