import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

//index route for app w header and footer
const Layout = (props) => {
  return (
    <div className='layout-container'>
      <header>
        <div className='header-div'>
          <Link to='/'>
            <img className='header-logo' src={require('../img/notterHead-wideShort.png')} alt='headerImage Here' />
          </Link>
        </div>
      </header>
      <div className='child-display'>{props.children}</div>
      <footer>
        <p className='footer-text'>Copyright 2018 <strong>notterHott</strong></p>
      </footer>
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node
}

Layout.defaultProps = {
  children: []
}
