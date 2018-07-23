import React from 'react'
import PropTypes from 'prop-types'

//card displays user profile with checkMeOut button prop-method that generates
// HilightUser component, rendered from RateMeContainer component
const UserCard = ({ onHandleClick, getHottie, user }) => {
  return (
    <div className='profile-display'>
      <button type='button' onClick={() => getHottie('P', user.cell)}>
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
  getHottie: PropTypes.func,
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
  getHottie: () => {},
  onHandleClick: () => {}
}

export default UserCard
