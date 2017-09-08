import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Filters from './Filters.jsx'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/Filters' component={Filters}/>
    </Switch>
  </main>
)

export default Main
