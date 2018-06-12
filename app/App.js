import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Layout from '../src/component/Layout'
import RateMeContainer from '../src/component/RateMeContainer'
import HilightUser from '../src/component/HilightUser'

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={RateMeContainer} />
        <Route path='/hottest/:fullId' component={HilightUser} />
      </Route>
    </Router>
  )
}

export default App
