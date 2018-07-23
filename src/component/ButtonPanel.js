import React from 'react'
import PropTypes from 'prop-types'

//buttons to trigger filter and reduce methods via prop on parent
//RateMeContainer component
const ButtonPanel = ({ filterClick, hottieClick }) => {
  return (
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
            onClick={() => filterClick('all')}>
            Women&Men
          </button>
          <button
            type='button'
            className='filter-buttons pure-button pure-button-active'
            onClick={() => filterClick('female')}>
            Women Only
          </button>
          <button
            type='button'
            className='filter-buttons pure-button pure-button-active'
            onClick={() => filterClick('male')}>
            Men Only
          </button>
        </div>
        <div className='buttonCont-bottomHalf'>
          <button
            type='button'
            className='filter-buttons pure-button pure-button-active'
            onClick={() => hottieClick('male')}>
            Hottest Guy
          </button>
          <button
            type='button'
            className='filter-buttons pure-button pure-button-active'
            onClick={() => hottieClick('female')}>
            Hottest Woman
          </button>
          <button
            type='button'
            className='filter-buttons pure-button pure-button-active'
            onClick={() => hottieClick('all')}>
            MOSTHOT
          </button>
        </div>
      </div>
    </div>
  )
}

ButtonPanel.propTypes = {
  filterClick: PropTypes.func,
  hottieClick: PropTypes.func
}

ButtonPanel.defaultProps = {
  filterClick: (() => {}),
  hottieClick: (() => {})
}

export default ButtonPanel
